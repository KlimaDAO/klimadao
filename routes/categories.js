'use strict'
const { client } = require('../apollo-client.js');
const {GET_CATEGORIES } = require('../queries/categories');


module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        path: '/categories',
        schema: {
            tags: ["category"],
            response: {
                '2xx': {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                    }
                }
            }
        },
        handler: async function (request, reply) {

            var data = await client(process.env.GRAPH_API_URL)
                .query({
                    query: GET_CATEGORIES,
                });

            return reply.send(JSON.stringify(data.data.categories));
        }
    })
}
