const { ApolloClient, InMemoryCache } = require('@apollo/client');


// Setup our client
function client(subgraphUrl) {
    const client = new ApolloClient({
        uri: subgraphUrl,
        cache: new InMemoryCache(),
    });

    return client;
}

module.exports.client = client;