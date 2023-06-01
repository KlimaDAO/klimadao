'use strict'
const { getAllVintages } = require('../helpers/utils.js');

module.exports = async function (fastify, opts) {
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

            const vintages = await getAllVintages(fastify)

            return reply.send(JSON.stringify(vintages));
        }
    })
}
