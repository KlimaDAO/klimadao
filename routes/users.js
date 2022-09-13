'use strict'
const { ApolloClient, InMemoryCache, gql, useQuery } = require('@apollo/client');
const { client } = require('./apollo-client.js');
const { GET_USER_LISTINGS } = require('../queries/users.js');


module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        path: '/users/:wallet',
        schema: {
            response: {
                '2xx': {
                    type: 'object',
                    properties: {
                        handle: { type: 'string' },
                        username: { type: 'string' },
                        description: { type: 'string' },
                        wallet: { type: 'string' },
                        listings: { type: 'array' }
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

            var listings = await client
                .query({
                    query: GET_USER_LISTINGS,
                    variables: { wallet }
                });


            var response = user.data();
            response.wallet = wallet;
            response.listings = listings.data.listings;

            return reply.send(response);
        }
    }),
        fastify.route({
            method: 'POST',
            path: '/users',
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        handle: { type: 'string', minLength: 3 },
                        username: { type: 'string', minLength: 2 },
                        description: { type: 'string', minLength: 2, maxLength: 500 },
                        wallet: { type: 'string', minLength: 26, maxLength: 64 }
                    },
                    required: ['handle', 'username', 'wallet']
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
                    var data = {};
                    await fastify.firebase.firestore()
                        .collection("users")
                        .doc(request.body.wallet).update({
                            username: request.body.username,
                            handle: request.body.handle,
                        });
                    return reply.send(request.body);
                } catch (err) {
                    return reply.code(403).send({ code: 404, error: "No document to update" });
                }
            }
        })
}
