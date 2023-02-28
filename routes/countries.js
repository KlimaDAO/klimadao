'use strict';

const { getAllCountries, convertArrayToObjects } = require('../helpers/utils.js');

// Export an async function that registers a Fastify route
module.exports = async function (fastify, opts) {
  fastify.route({
    // The HTTP method for this route is GET
    method: 'GET',
    // The path for this route is '/countries'
    path: '/countries',
    // Define a JSON schema for the response
    schema: {
      tags: ['country'],
      response: {
        '2xx': {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
        },
      },
    },
    // Define the route handler function
    handler: async function (request, reply) {
      try {
        const countries = await getAllCountries()
       

        return reply.send(JSON.stringify(convertArrayToObjects(countries)));
      } catch (error) {
        // If an error occurred while executing the query, return a Internal Server Error response
        return reply.status(500).send({ message: 'An internal server error occurred' });
      }
    },
  });
};
