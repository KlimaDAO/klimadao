'use strict'

const fp = require('fastify-plugin')

// const fastifyOpenapiDocs = require('fastify-openapi-docs')
/*
Since fastify-openapi-docs uses an onRoute hook, you have to either:

* use `await register...`
* wrap you routes definitions in a plugin

See: https://www.fastify.io/docs/latest/Guides/Migration-Guide-V4/#synchronous-route-definitions
*/
module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/swagger'), {
        routePrefix: '/documentation',
        swagger: {
            info: {
                title: 'Marketplace swagger',
                description: 'Fastify swagger API for Marketplace',
                version: '0.1.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'category', description: 'Code related end-points' },
                { name: 'country', description: 'Code related end-points' },
                { name: 'project', description: 'Code related end-points' }

            ],
            definitions: {
                User: {
                    type: 'object',
                    required: ['wallet', 'email'],
                    properties: {
                        wallet: { type: 'string', format: 'address' },
                        handle: { type: 'string' },
                        username: { type: 'string' },
                        description: { type: 'string', format: 'text' },
                        listings: {
                            type: 'array',
                            items:
                            {
                                type: 'object', properties: {
                                    id: { type: 'number' },
                                    totalAmountToSell: { type: 'number' },
                                    tokenAddress: { type: 'address' },
                                    active: { type: 'boolean' },
                                    deleted: { type: 'boolean' , items: []},
                                    batches: { type: 'array', items: [] },
                                    batchPrices: { type: 'array' },
                                    singleUnitPrice: { type: 'number' },
                                    project: {
                                        type: 'object', properties: {
                                            name: { type: 'string' },
                                            category: { type: 'string' },
                                        }
                                    },
                                }
                            }
                        },
                        activities: {
                            type: 'array', items:
                            {
                                type: 'object', properties: {
                                    id: { type: 'number' },
                                    amount: { type: 'number' },
                                    previousAmount: { type: 'number' },
                                    price: { type: 'number' },
                                    previousPrice: { type: 'number' },
                                    timeStamp: { type: 'number' },
                                    project: {
                                        type: 'object', properties: {
                                            key: { type: 'string' },
                                        }
                                    },
                                    seller: {
                                        type: 'object', properties: {
                                            id: { type: 'address' },
                                        }
                                    },
                                    buyer: {
                                        type: 'object', properties: {
                                            id: { type: 'address' },
                                        }
                                    },

                                }
                            }
                        }

                    }
                },
                Project: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        key: { type: 'string' },
                        projectID: { type: 'string' },
                        name: { type: 'string' },
                        methodology: { type: 'string' },
                        vintage: { type: 'number' },
                        projectAddress: { type: 'address' },
                        registry: { type: 'string' },
                    }
                },
                Category: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                    }
                },
                Country: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                    }
                },
            },
            securityDefinitions: {
                apiKey: {
                    type: 'apiKey',
                    name: 'apiKey',
                    in: 'header'
                }
            }
        },
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function (request, reply, next) { next() },
            preHandler: function (request, reply, next) { next() }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        exposeRoute: true
    })
})
