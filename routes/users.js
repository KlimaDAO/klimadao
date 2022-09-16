'use strict'
const { client } = require('../apollo-client.js');
const { GET_USER_DATA } = require('../queries/users.js');


module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        path: '/users/:wallet',
        schema: {
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
                        activities: { type: 'array' }
                    }
                }
            }
        },

        handler: async function (request, reply) {
            const { wallet } = request.params;

            const user = await fastify.firebase.firestore()
                .collection("users")
                .doc(wallet)
                .get();

            if (!user.exists) {
                return reply.notFound();
            }

            var data = await client(process.env.GRAPH_API_URL)
                .query({
                    query: GET_USER_DATA,
                    variables: { wallet }
                });

            var response = user.data();
            response.wallet = wallet;
            if (data.users.length) {
                response.listings = data.data.users[0].listings;
                response.activities = data.data.users[0].activities;
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
