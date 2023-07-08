import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, isNil, map, merge } from "lodash";
import { assign, curry, get, toUpper } from "lodash/fp";
import { Holding } from "../../.generated/types/assets.types";
import { Activity, Listing } from "../../.generated/types/marketplace.types";
import { selector } from "../../utils/functional.utils";
import { gqlSdk } from "../../utils/gqlSdk";
import { formatActivity } from "../../utils/helpers/activities.utils";
import {
  getUserByWallet,
  getUserDocumentByHandle,
  getUserDocumentByWallet,
} from "../../utils/helpers/users.utils";
interface Params {
  walletOrHandle: string;
}

interface Querystring {
  type: string;
}
type ResponseType = {
  handle: string;
  username: string;
  description: string;
  profileImgUrl: string | null;
  updatedAt: number;
  createdAt: number;
  wallet: string;
  listings: Listing[];
  activities: Activity[];
  assets: Holding[];
};

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
        profileImgUrl: {
          anyOf: [
            {
              type: "string",
            },
            {
              type: "null",
            },
          ],
        },
        updatedAt: { type: "number" },
        createdAt: { type: "number" },
        wallet: { type: "string" },
        listings: { type: "array" },
        activities: { type: "array" },
        assets: { type: "array" },
      },
    },
  },
};

/** Fetch the user object from firestore and the marketplace subgraph */
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{ Params: Params; Querystring: Querystring }>,
    reply: FastifyReply
  ): Promise<ResponseType | void> {
    // Destructure the userIdentifier parameter from the request object
    const { walletOrHandle } = request.params;

    // Destructure the type query parameter from the request object
    const { type } = request.query;

    // Fetch our user
    const fetchUserFn =
      type === "wallet" ? getUserDocumentByWallet : getUserDocumentByHandle;
    const firebaseUserDocument = await fetchUserFn(
      fastify.firebase,
      walletOrHandle
    );

    const firebaseUser = firebaseUserDocument?.data();

    // If no documents are found, return a 403 error
    if (isNil(firebaseUser)) return reply.notFound();

    const wallet = firebaseUserDocument?.id.toLowerCase();

    // Query the GraphQL API with the wallet address to get more user data
    const { users } = await gqlSdk.marketplace.getUserByWallet({ wallet });
    const marketplaceUser = users.at(0);

    // Graph listings for the user
    const listings = map(
      marketplaceUser?.listings,
      assign({ selected: false })
    );

    const activities = compact(marketplaceUser?.activities);

    // const listingSellerData = listings.map(get(""),curry(getUserByHandle)(fastify.firebase))
    const sellerIds = listings.map(get("seller.id"), toUpper);
    const buyerIds = activities.map(get("buyer.id"), toUpper);

    /** Curry our fetch with the firebase instance */
    const _getUserByWallet = curry(getUserByWallet)(fastify.firebase);

    const sellers = await Promise.all(sellerIds.map(_getUserByWallet));
    const buyers = await Promise.all(buyerIds.map(_getUserByWallet));

    /** Find and assign the FB User to the given listing */
    const mapSellerToListing = (listing: Listing) => {
      const seller = compact(sellers).find(selector("id", listing.seller.id));
      return assign(listing, seller);
    };

    /** Find and assign the FB User to the given activity */
    const mapSellerBuyerToActivity = (activity: Activity) => {
      const seller = compact(buyers).find(selector("id", activity.seller?.id));
      const buyer = compact(buyers).find(selector("id", activity.buyer?.id));
      return merge(activity, { seller, buyer });
    };

    const listingsWithSellerData = listings.map(mapSellerToListing);
    const activitiesWithUserData = activities
      .map(mapSellerBuyerToActivity)
      .map(formatActivity);

    const { accounts } = await gqlSdk.assets.getHoldingsByWallet({ wallet });

    return reply.send({
      ...firebaseUser,
      listings: listingsWithSellerData,
      activities: activitiesWithUserData,
      assets: accounts.at(0)?.holdings,
    });
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/users/:walletOrHandle",
    schema,
    handler: handler(fastify),
  });
