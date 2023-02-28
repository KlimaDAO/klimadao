'use strict';

const { getAllCategories, convertArrayToObjects } = require('../helpers/utils.js');

// Export an async function that registers a Fastify route
module.exports = async function (fastify, opts) {
  fastify.route({
    // The HTTP method for this route is GET
    method: 'GET',
    // The path for this route is '/categories'
    path: '/categories',
    // Define a JSON schema for the response
    schema: {
      tags: ['category'],
      response: {
        '2xx': {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
      },
    },
    // Define the route handler function
    handler: async function (request, reply) {
      try {
        // Execute the GET_CATEGORIES query and store the result in the 'data' variable
        const categories = await getAllCategories()
       

        return reply.send(JSON.stringify(convertArrayToObjects(categories)));
      } catch (error) {
        // If an error occurred while executing the query, return a Internal Server Error response
        return reply.status(500).send({ message: 'An internal server error occurred' });
      }
    },
  });
};
