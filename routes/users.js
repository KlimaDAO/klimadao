'use strict'
const { client } = require('../apollo-client.js');
const { GET_USER_DATA } = require('../queries/users.js');
const ethers = require('ethers');
const jwt = require('jsonwebtoken');

const generateNounce = () => (Math.random() + 1).toString(36).substring(2);
const users = {};


module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'POST',
        path: '/users/login',
        schema: {
            tags: ["user"],
            body: {
                type: 'object',
                properties: {
                    wallet: { type: 'string', minLength: 26, maxLength: 64 }
                },
                required: ['wallet']
            },
            response: {
                '2xx': {
                    type: 'object',
                    properties: {
                        nonce: { type: 'string' },
                    }
                }
            }
        },

        handler: async function (request, reply) {
            const walletAddress = request.body.wallet;
            console.log(walletAddress);
            if (!walletAddress) {
                reply.code(400);
                reply.send('Bad Request');
                return;
            }
            if (!!users[walletAddress]) {
                reply.send({ nonce: users[walletAddress].nonce });
                return;
            }
            const nonce = generateNounce();
            users[walletAddress] = { walletAddress, nonce };
            reply.send({ nonce });
        }
    }),
        fastify.route({
            method: 'POST',
            path: '/users/login/verify',
            schema: {
                tags: ["user"],
                body: {
                    type: 'object',
                    properties: {
                        wallet: { type: 'string', minLength: 26, maxLength: 64 },
                        signature: { type: 'string' }
                    },
                    required: ['wallet', 'signature']
                },
                response: {
                    '2xx': {
                        type: 'object',
                        properties: {
                            token: { type: 'string' },
                        }
                    }
                }
            },

            handler: async function (request, reply) {
                const { signature, wallet } = request.body;
                const dbUser = users[wallet];

                const signedMessage = `Sign to authenticate ownership and edit your Klima Marketplace Profile 💚\n\nSignature nonce: ${dbUser.nonce}`;
                const signerWalletAddress = ethers.utils.verifyMessage(signedMessage, signature);

                if (signerWalletAddress.toLowerCase() !== dbUser.walletAddress.toLowerCase()) {
                    reply.statusCode = 401;
                    reply.send('Bad Creds');
                    return;
                }

                const token = fastify.jwt.sign({ wallet })
                console.log(token);
                request.session.token = token;
                users[wallet].nonce = generateNounce();
                reply.send({token});
            }
        }),
        fastify.route({
            method: 'GET',
            path: '/users/:userIdentifier',
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                    }
                },
                tags: ["user"],
                response: {
                    '2xx': {
                        type: 'object',
                        properties: {
                            handle: { type: 'string' },
                            username: { type: 'string' },
                            description: { type: 'string' },
                            wallet: { type: 'string' },
                            listings: { type: 'array' },
                            activities: { type: 'array' },
                            assets: { type: 'array' }
                        }
                    }
                }
            },

            handler: async function (request, reply) {
                const { userIdentifier } = request.params;
                var { type } = (request.query);

                var user;
                if (type == "wallet") {
                    user = await fastify.firebase.firestore()
                        .collection("users")
                        .doc(userIdentifier)
                        .get();

                    if (!user.exists) {
                        return reply.notFound();
                    }
                } else {
                    let usersRef = fastify.firebase.firestore().collection("users");
                    const users = await usersRef.where('handle', '==', userIdentifier).get();


                    if (users.empty) {
                        return reply.notFound();
                    }

                    users.forEach(doc => {
                        user = doc;
                    });
                }
                var response = user.data();
                var wallet = user.id;

                var data = await client(process.env.GRAPH_API_URL)
                    .query({
                        query: GET_USER_DATA,
                        variables: { wallet }
                    });

                // @todo -> merge with other graph
                response.wallet = wallet;
                if (data.data.users.length) {
                    response.listings = data.data.users[0].listings;

                    // console.log( data.data.users[0].listings.length);
                    // console.log( " ======== ")
                    for (let i = 0; i < data.data.users[0].listings.length ; i++) {
                        var seller = await fastify.firebase.firestore()
                        .collection("users")
                        .doc(data.data.users[0].listings[i].seller.id)
                        .get();
                       
                        if (seller.empty) {
                           console.log('seller is empty');
                        }
    
                        users.forEach(doc => {
                            user = doc;
                        });
                       console.log(data.data.users[0].listings[i].seller.id, seller.data());
                    }
                  
                    response.activities = data.data.users[0].activities;
                    response.assets = [
                        '0xa1c1cCD8C61FeC141AAed6B279Fa4400b68101d4'
                    ]
                    //console.log(response);
                } else {
                    response.listings = [];
                    response.activities = [];
                }
                return reply.send(response);
            }

        }),
        fastify.route({
            method: 'POST',
            path: '/users',
            onRequest: [fastify.authenticate],
            schema: {
                tags: ["user"],
                body: {
                    type: 'object',
                    properties: {
                        handle: { type: 'string', minLength: 3 },
                        username: { type: 'string', minLength: 2 },
                        description: { type: 'string', minLength: 2, maxLength: 500 },
                        wallet: { type: 'string', minLength: 26, maxLength: 64 }
                    },
                    required: ['handle', 'username', 'wallet', 'description']
                },
                response: {
                    '2xx': {
                        type: 'object',
                        properties: {
                            handle: { type: 'string' },
                            username: { type: 'string' },
                            wallet: { type: 'string' }
                        }
                    },
                    '403': {
                        type: 'object',
                        properties: {
                            error: { type: 'string' },
                            code: { type: 'number' },
                        }
                    }
                }
            },
            handler: async function (request, reply) {
                // @TODO -> check if there is a better way of doing this
                const user = await fastify.firebase.firestore()
                    .collection("users")
                    .doc(request.body.wallet)
                    .get();
                if (user.exists) {
                    return reply.code(403).send({
                        "code": 403,
                        "error": "This user is already registered!"
                    }
                    );
                }
                try {
                    await fastify.firebase.firestore()
                        .collection("users")
                        .doc(request.body.wallet).set({
                            username: request.body.username,
                            handle: request.body.handle,
                            description: request.body.description,
                        });
                    return reply.send(request.body);
                } catch (err) {
                    return reply.error({ error: err });
                }
            }
        }),
        fastify.route({
            method: 'PUT',
            onRequest: [fastify.authenticate],
            path: '/users/:wallet',
            schema: {
                tags: ["user"],
                body: {
                    type: 'object',
                    properties: {
                        handle: { type: 'string', minLength: 3 },
                        username: { type: 'string', minLength: 2 },
                        description: { type: 'string', minLength: 2, maxLength: 500 },
                    },
                },
                response: {
                    '2xx': {
                        type: 'object',
                        properties: {
                            handle: { type: 'string' },
                            username: { type: 'string' },
                            wallet: { type: 'string' },
                            description: { type: 'string' },
                        }
                    },

                }
            },
            handler: async function (request, reply) {
                try {
                    await fastify.firebase.firestore()
                        .collection("users")
                        .doc(request.body.wallet).update({
                            username: request.body.username,
                            description: request.body.description,
                        });
                    return reply.send(request.body);
                } catch (err) {
                    return reply.code(403).send({ code: 404, error: "No document to update" });
                }
            }
        })
}
