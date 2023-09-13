import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, map, merge } from "lodash";
import { assign, get, toUpper } from "lodash/fp";
import {
  ByWalletUserActivity,
  ByWalletUserListing,
} from "../../graphql/marketplace.types";
import { User } from "../../models/User.model";
import { selector } from "../../utils/functional.utils";
import { gqlSdk } from "../../utils/gqlSdk";
import { formatActivity } from "../../utils/helpers/activities.utils";
import {
  getUserDocumentByHandle,
  getUserDocumentByWallet,
  getUserDocumentsByIds,
} from "../../utils/helpers/users.utils";
import { Params, QueryString, schema } from "./get.schema";

/** Fetch the user object from firestore and the marketplace subgraph */
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{
      Params: Static<typeof Params>;
      Querystring: Static<typeof QueryString>;
    }>,
    reply: FastifyReply
  ): Promise<User | void> {
    const { walletOrHandle } = request.params;
    const { type } = request.query;

    const fetchUserFn =
      type === "wallet" ? getUserDocumentByWallet : getUserDocumentByHandle;

    const firebaseUserDocument = await fetchUserFn(
      fastify.firebase,
      walletOrHandle
    );
    // If no documents are found, return a 404 error
    if (!firebaseUserDocument?.exists) return reply.notFound();

    const document = firebaseUserDocument.data();

    const wallet = firebaseUserDocument.id.toLowerCase();

    // Query the GraphQL API with the wallet address to get more user data
    const { users } = await gqlSdk.marketplace.getUserByWallet({ wallet });

    const { accounts } = await gqlSdk.assets.getHoldingsByWallet({ wallet });

    const user = users.at(0);

    // Graph listings for the user
    const listings = map(user?.listings, assign({ selected: false }));

    const activities = compact(user?.activities);

    const sellerIds = listings.map(get("seller.id"), toUpper);
    const buyerIds = activities.map(get("buyer.id"), toUpper);

    /** Fetch all buyers and sellers */
    const [sellers, buyers] = await Promise.all([
      getUserDocumentsByIds(fastify.firebase, sellerIds),
      getUserDocumentsByIds(fastify.firebase, buyerIds),
    ]);

    /** Find and assign the FB User to the given listing */
    const mapSellerToListing = (listing: ByWalletUserListing) => {
      const seller = compact(sellers).find(selector("id", listing.seller?.id));
      return assign(listing, seller);
    };

    /** Find and assign the FB User to the given activity */
    const mapSellerBuyerToActivity = (activity: ByWalletUserActivity) => {
      const seller = compact(buyers).find(selector("id", activity.seller?.id));
      const buyer = compact(buyers).find(selector("id", activity.buyer?.id));
      return merge(activity, { seller, buyer });
    };

    const listingsWithSellerData = listings.map(mapSellerToListing);
    const activitiesWithUserData = activities
      .map(mapSellerBuyerToActivity)
      .map(formatActivity);

    const response: User = {
      createdAt: document.createdAt,
      description: document.description,
      handle: document.handle,
      profileImgUrl: document.profileImgUrl,
      updatedAt: document.updatedAt,
      username: document.username,
      listings: listingsWithSellerData,
      activities: activitiesWithUserData,
      assets: accounts.at(0)?.holdings ?? [],
      wallet,
    };

    return reply.send(response);
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/users/:walletOrHandle",
    handler: handler(fastify),
    schema,
  });
