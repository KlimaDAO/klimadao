'use strict'
const { executeGraphQLQuery } = require('../apollo-client.js');
const { GET_VINTAGES } = require('../queries/vintage.js');

module.exports = async function (fastify, opts) {

    // @TODO: merge with other projects from the poooool
    fastify.route({
        method: 'GET',
        path: '/vintages',
        schema: {
            tags: ["project"],
            response: {
                '2xx': {
                    type: 'object',
                    properties: {
                        vintage: { type: 'number' },
                    }
                }
            }
        },
        handler: async function (request, reply) {

            const data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_VINTAGES);

            const uniqueValues = new Set();

            data.data.projects.forEach(item => uniqueValues.add(item.vintage));

            const result = Array.from(uniqueValues);
            // Send the transformed projects array as a JSON string in the response
            return reply.send(JSON.stringify(result));
        }
    })
}
