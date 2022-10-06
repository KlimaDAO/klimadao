const { ApolloClient, InMemoryCache, HttpLink } = require('@apollo/client');

const fetch = require('cross-fetch');


// Setup our client
function client(subgraphUrl) {
    const link = new HttpLink({
        uri: subgraphUrl
        // Additional options
      });
      
    const client = new ApolloClient({
        uri: subgraphUrl,
        cache: new InMemoryCache(),
        // link: new HttpLink({
        //     fetch,
        // })
    });

    return client;
}

module.exports.client = client;