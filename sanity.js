const { createClient }  = require('@sanity/client');

function getSanityClient() {
    return createClient({
        projectId: "l6of5nwi",
        dataset: "production",
        apiVersion: "2023-02-04",
        useCdn: true,
    });
  }

module.exports = {
    getSanityClient
};
