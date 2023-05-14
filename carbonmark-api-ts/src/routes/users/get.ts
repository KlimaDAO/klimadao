import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import {
  GetHoldingsByWalletDocument,
  GetHoldingsByWalletQuery,
} from "../../graphql/generated/carbon-holdings.types";
import {
  GetUserByWalletDocument,
  GetUserByWalletQuery,
} from "../../graphql/generated/marketplace.types";
import { executeGraphQLQuery } from "../../utils/apollo-client";
interface Params {
  walletOrHandle: string;
}

interface Querystring {
  type: string;
}

const schema = {
  querystring: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
    },
  },
  response: {
    "2xx": {
      type: "object",
      properties: {
        handle: { type: "string" },
        username: { type: "string" },
        description: { type: "string" },
        profileImgUrl: { type: "string" },
        wallet: { type: "string" },
        listings: { type: "array" },
        activities: { type: "array" },
        assets: { type: "array" },
      },
    },
  },
};

const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Params: Params; Querystring: Querystring }>,
    reply: FastifyReply
  ) {
    // Destructure the userIdentifier parameter from the request object
    const { walletOrHandle } = request.params;
    // Destructure the type query parameter from the request object
    var { type } = request.query;

    var user;

    if (type == "wallet") {
      // Query the Firestore database for the document with a matching wallet address
      user = await fastify.firebase
        .firestore()
        .collection("users")
        .doc(walletOrHandle.toUpperCase())
        .get();
      // If the document doesn't exist, return a 404 error
      if (!user.exists) {
        return reply.notFound();
      }
    } else {
      // Query the Firestore database for documents with a matching handle
      let usersRef = fastify.firebase.firestore().collection("users");
      //const users = await usersRef.where('handle', '==', userIdentifier).get();
      const userSnapshot = await usersRef
        .where("handle", "==", walletOrHandle.toLowerCase())
        .limit(1)
        .get();
      // If no documents are found, return a 404 error
      if (userSnapshot.empty) {
        return reply.notFound();
      }
      // Iterate through the documents and assign the first one to the user variable
      user = userSnapshot.docs[0];
    }
    // Create a response object with the data from the retrieved user document
    var response = user.data() ?? {};
    // Get the wallet address of the user
    var wallet = user.id.toLowerCase();
    // Query the GraphQL API with the wallet address to get more user data
    const { data } = await executeGraphQLQuery<GetUserByWalletQuery>(
      process.env.GRAPH_API_URL,
      GetUserByWalletDocument,
      { wallet }
    );
    // Add the wallet address to the response object
    response.wallet = wallet;
    // If the users array in the data is not empty
    if (data.users.length) {
      // Create a new listings array with the listings from the data, and add a "selected" property set to false
      const listings =
        data.users[0].listings?.map((item) => ({
          ...item,
          selected: false,
        })) ?? [];

      await Promise.all(
        listings?.map(async (listing) => {
          const seller = await fastify.firebase
            .firestore()
            .collection("users")
            .doc(listing.seller.id.toUpperCase())
            .get();
          listing.seller = { ...seller.data(), ...listing.seller };
        })
      );
      // Add the modified listings array to the response object
      response.listings = listings;
      // Add the activities array from the data to the response object
      response.activities = data.users[0].activities;
    } else {
      // If the users array in the data is empty, add empty arrays for listings and activities to the response object
      response.listings = [];
      response.activities = [];
    }

    const assetsData = await executeGraphQLQuery<GetHoldingsByWalletQuery>(
      process.env.ASSETS_GRAPH_API_URL,
      GetHoldingsByWalletDocument,
      { wallet }
    );

    if (assetsData.data.accounts.length) {
      response.assets = assetsData.data.accounts[0].holdings;
    } else {
      response.assets = [];
    }

    // Return the response object
    return reply.send(response);
  };

const get: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/users/:walletOrHandle", { schema }, handler(fastify));
};

export default get;
