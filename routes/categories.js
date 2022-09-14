'use strict'
const { client } = require('../apollo-client.js');
const {GET_CATEGORIES } = require('../queries/categories');


module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        path: '/categories',
        handler: async function (request, reply) {

            var data = await client(process.env.GRAPH_API_URL)
                .query({
                    query: GET_CATEGORIES,
                });

            return reply.send(JSON.stringify(data.data.categories));
        }
    }),
}
