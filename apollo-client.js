const { ApolloClient, InMemoryCache, HttpLink } = require('@apollo/client');

// Import the cross-fetch library for making HTTP requests
const fetch = require('cross-fetch');
// Import the Fastify library for creating web servers and routes
const fastify = require('fastify');

// Create a new Apollo client instance
const client = new ApolloClient({
  // Use the createHttpLink function to create a link that sends GraphQL requests over HTTP
  link: new HttpLink({ uri: process.env.GRAPH_API_URL, fetch }),
  // Use the InMemoryCache to store the result of GraphQL queries in memory
  cache: new InMemoryCache({ addTypename: false }),
});

// Define a function that executes a GraphQL query and returns the result
async function executeGraphQLQuery(query, variables = {}) {

  // Subscribe to the query to receive updates when the data changes
  const subscription = client.subscribe({ query: query }).subscribe({
    next: (subscriptionData) => {
      // Update the cache with the new data when the recordAdded event is received
      if (subscriptionData.recordAdded) {
        client.cache.writeQuery({ query: query, data: subscriptionData.recordAdded });
      }
    },
  });

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
