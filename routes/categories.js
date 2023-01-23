'use strict';

// Import the executeGraphQLQuery function and the GET_CATEGORIES query
const { executeGraphQLQuery } = require('../apollo-client.js');
const { GET_CATEGORIES } = require('../queries/categories');

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
        const data = await executeGraphQLQuery(process.env.GRAPH_API_URL, GET_CATEGORIES);
        // If the query returned errors, return a Bad Request response with the first error message
        if (data.errors) {
          return reply.status(400).send({ message: data.errors[0].message });
        }
        // Otherwise, return the data from the query as a JSON string in the response
        return reply.send(JSON.stringify(data.data.categories));
      } catch (error) {
        // If an error occurred while executing the query, return a Internal Server Error response
        return reply.status(500).send({ message: 'An internal server error occurred' });
      }
    },
  });
};
