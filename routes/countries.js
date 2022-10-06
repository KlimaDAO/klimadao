'use strict'
const { client } = require('../apollo-client.js');
const { GET_COUNTRIES } = require('../queries/categories');


module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        path: '/countries',
        schema: {
            tags: ["country"],
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
                    query: GET_COUNTRIES,
                });
console.log(data)
            return reply.send(JSON.stringify(data.data.countries));
        }
    })
}
