const { ApolloClient, InMemoryCache, HttpLink } = require('@apollo/client');

const fetch = require('cross-fetch');
// const {fetch} = require('node-fetch')();


// Setup our client
function client(subgraphUrl) {
    const link = new HttpLink({
        uri: subgraphUrl,
        fetch
        // Additional options
      });
      
    const client = new ApolloClient({
       
        // fetch: fetch,
        // uri: subgraphUrl,
        cache: new InMemoryCache({
            addTypename: false
        }),
       link: link
    });

    return client;
}

module.exports.client = client;