import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { notEmpty } from "../../utils/functional.utils";
import { gqlSdk } from "../../utils/gqlSdk";
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
    const { type } = request.query;

    let user;

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
      const usersRef = fastify.firebase.firestore().collection("users");
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
    const response = user.data() ?? {};
    // Get the wallet address of the user
    const wallet = user.id.toLowerCase();

    // Query the GraphQL API with the wallet address to get more user data
    const { users } = await gqlSdk.marketplace.getUserByWallet({ wallet });

    // Add the wallet address to the response object
    response.wallet = wallet;

    // If the users array in the data is not empty
    if (notEmpty(users)) {
      // Create a new listings array with the listings from the data, and add a "selected" property set to false
      const listings =
        users[0].listings?.map((item) => ({
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
      response.activities = users[0].activities;
    } else {
      // If the users array in the data is empty, add empty arrays for listings and activities to the response object
      response.listings = [];
      response.activities = [];
    }

    const { accounts } = await gqlSdk.assets.getHoldingsByWallet({ wallet });

    if (accounts.length) {
      response.assets = accounts[0].holdings;
    } else {
      response.assets = [];
    }

    // Return the response object
    return reply.send(response);
  };

const get: FastifyPluginAsync = async (fastify): Promise<void> => {
  await fastify.get("/users/:walletOrHandle", { schema }, handler(fastify));
};

export default get;
