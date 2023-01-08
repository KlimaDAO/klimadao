'use strict'
const { executeGraphQLQuery } = require('../apollo-client.js');
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
            // Get the wallet address from the request body
            const walletAddress = request.body.wallet;

            // If the wallet address is not provided, return a 400 Bad Request error
            if (!walletAddress) {
                return reply.code(400).send("Bad Request");
            }

            // Check if the wallet address is already in the users object
            if (!!users[walletAddress]) {
                // If the wallet address is found, return the nonce associated with it
                return reply.send({ nonce: users[walletAddress].nonce });
            }

            // Generate a new nonce
            const nonce = generateNounce();

            // Add the wallet address and nonce to the users object
            users[walletAddress] = { walletAddress, nonce };

            // Return the nonce
            return reply.send({ nonce });
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
                // Destructure the wallet address and signature from the request body
                const { signature, wallet } = request.body;

                // Get the user from the users object
                const dbUser = users[wallet];

                // Create the signed message to verify
                const signedMessage = `${process.env.AUTHENTICATION_MESSAGE}${dbUser.nonce}`;

                // Verify the signature
                const signerWalletAddress = ethers.utils.verifyMessage(signedMessage, signature);

                // If the signature is invalid, send a 401 Unauthorized response
                if (signerWalletAddress.toLowerCase() !== dbUser.walletAddress.toLowerCase()) {
                    return reply.code(401).send('Unauthorized: Invalid signature');
                }

                // Create a JWT token for the user
                const token = fastify.jwt.sign({ wallet });

                // Save the token to the session
                request.session.token = token;

                // Generate a new nonce for the user
                users[wallet].nonce = generateNounce();

                // Send the token back to the client
                return reply.send({ token });
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
                // Destructure the userIdentifier parameter from the request object
                const { userIdentifier } = request.params;
                // Destructure the type query parameter from the request object
                var { type } = (request.query);
                // Log the type to the console
                console.log(type)
                var user;
                if (type == "wallet") {
                    // Query the Firestore database for the document with a matching wallet address
                    user = await fastify.firebase.firestore()
                        .collection("users")
                        .doc(userIdentifier.toUpperCase())
                        .get();
                    // If the document doesn't exist, return a 404 error
                    if (!user.exists) {
                        return reply.notFound();
                    }
                } else {
                    // Query the Firestore database for documents with a matching handle
                    let usersRef = fastify.firebase.firestore().collection("users");
                    //const users = await usersRef.where('handle', '==', userIdentifier).get();
                    const userSnapshot = await usersRef.where('handle', '==', userIdentifier).limit(1).get();
                    // If no documents are found, return a 404 error
                    if (userSnapshot.empty) {
                        return reply.notFound();
                    }
                    // Iterate through the documents and assign the first one to the user variable
                    const user = userSnapshot.docs[0];

                }
                // Create a response object with the data from the retrieved user document
                var response = user.data();
                // Get the wallet address of the user
                var wallet = user.id.toLowerCase();
                // Query the GraphQL API with the wallet address to get more user data
                const data = await executeGraphQLQuery(GET_USER_DATA,  {wallet} );
                // Add the wallet address to the response object
                response.wallet = wallet;
                // If the users array in the data is not empty
                if (data.data.users.length) {
                    // Create a new listings array with the listings from the data, and add a "selected" property set to false
                    const listings = data.data.users[0].listings.map((item) => ({ ...item, selected: false }));

                    await Promise.all(
                        listings.map(async (listing) => {
                            const seller = await fastify.firebase.firestore()
                                .collection("users")
                                .doc((listing.seller.id).toUpperCase())
                                .get();
                            listing.seller = { ...seller.data(), ...listing.seller };
                        })
                    );
                    // Add the modified listings array to the response object
                    response.listings = listings;
                    // Add the activities array from
                    // Add the activities array from the data to the response object
                    response.activities = data.data.users[0].activities;
                    // Add a fixed array of assets to the response object
                    response.assets = ['0xa1c1cCD8C61FeC141AAed6B279Fa4400b68101d4', '0xE5d7FEbFf7d73C5a5AfA97047C7863Cd1f6D0748']
                } else {
                    // If the users array in the data is empty, add empty arrays for listings and activities to the response object
                    response.listings = [];
                    response.activities = [];
                    // Add a fixed array of assets to the response object
                    response.assets = ['0xa1c1cCD8C61FeC141AAed6B279Fa4400b68101d4', '0xE5d7FEbFf7d73C5a5AfA97047C7863Cd1f6D0748']
                }
                // Return the response object
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
                // Destructure the wallet, username, handle, and description properties from the request body
                const { wallet, username, handle, description } = request.body;

                // Query the Firestore database for the user document with the specified wallet address
                const user = await fastify.firebase.firestore()
                    .collection("users")
                    .doc(wallet)
                    .get();

                // If the user document exists, return a 403 error with a message
                if (user.exists) {
                    return reply.code(403).send({
                        "code": 403,
                        "error": "This user is already registered!"
                    });
                }

                try {
                    // Try creating a new user document with the specified data
                    await fastify.firebase.firestore()
                        .collection("users")
                        .doc(wallet.toUpperCase()).set({
                            username,
                            handle,
                            description,
                        });
                    // If the document is successfully created, return the request body
                    return reply.send(request.body);
                } catch (err) {
                    // If an error occurs, return the error in the response
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
                // Destructure the wallet, username, and description properties from the request body
                const { wallet, username, description } = request.body;

                try {
                    // Try updating the user document with the specified data
                    await fastify.firebase.firestore()
                        .collection("users")
                        .doc(wallet.toUpperCase()).update({
                            username: username,
                            description: description,
                        });
                    // If the update is successful, return the request body
                    return reply.send(request.body);
                } catch (err) {
                    // If an error occurs, return a 404 error with a message
                    return reply.code(403).send({ code: 404, error: "No document to update" });
                }
            }
        })
}
