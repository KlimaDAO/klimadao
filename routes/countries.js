'use strict'
const { client } = require('../apollo-client.js');
const { GET_COUNTRIES } = require('../queries/categories');


module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        path: '/countries',
        handler: async function (request, reply) {

            var data = await client(process.env.GRAPH_API_URL)
                .query({
                    query: GET_COUNTRIES,
                });

            return reply.send(JSON.stringify(data.data.countries));
        }
    }),
}
