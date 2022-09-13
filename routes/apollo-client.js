const { ApolloClient, InMemoryCache } = require('@apollo/client');


// Setup our client
const client = new ApolloClient({
    uri: process.env.GRAPH_API_URL,
    cache: new InMemoryCache(),
})


module.exports.client = client;