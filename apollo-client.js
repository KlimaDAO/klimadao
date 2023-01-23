const { ApolloClient, InMemoryCache, HttpLink } = require('@apollo/client');

// Import the cross-fetch library for making HTTP requests
const fetch = require('cross-fetch');
// Import the Fastify library for creating web servers and routes
const fastify = require('fastify');

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

// Create a new Apollo client instance
const client = new ApolloClient({
  // Use the createHttpLink function to create a link that sends GraphQL requests over HTTP
link: new HttpLink({ uri: process.env.GRAPH_API_URL, fetch }),
  // Use the InMemoryCache to store the result of GraphQL queries in memory
  cache: new InMemoryCache({ addTypename: false, resultCaching: false }),
  defaultOptions: defaultOptions,
});


// Define a function that executes a GraphQL query and returns the result
async function executeGraphQLQuery( link, query, variables = {}) {
console.log(link, query);
  client.setLink( new HttpLink({ uri:link, fetch }));

  try {
    // Execute the query and return the result
    return await client.query({
        query:query,
        variables: variables
    });
  } catch (error) {
    // If an error occurred while executing the query, throw a new Error with the error message
    throw new Error(error);
  }
}

// Export the Apollo client instance and the executeGraphQLQuery function
module.exports = {
  client,
  executeGraphQLQuery,
};
