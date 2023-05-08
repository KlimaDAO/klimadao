'use strict'
const { executeGraphQLQuery } = require('../apollo-client.js');
const {GET_PURCHASE_BY_ID } = require('../queries/purchase');


module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        path: '/purchases/:id',
        schema: {
            tags: ["purchase"],
        },
        handler: async function (request, reply) {
            const {id } = request.params;


            const data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_PURCHASE_BY_ID, {
                id
            });

            return reply.send(JSON.stringify(data.data.purchases[0]));
        }
    })
}
