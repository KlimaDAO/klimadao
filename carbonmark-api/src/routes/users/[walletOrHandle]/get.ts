import { Static } from "@sinclair/typebox";
import { utils } from "ethers";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Activity } from "../../../models/Activity.model";
import { Listing } from "../../../models/Listing.model";
import { User } from "../../../models/User.model";
import {
  getProfileByAddress,
  getProfileByHandle,
  getUserProfilesByIds,
} from "../../../utils/helpers/users.utils";
import { formatListing } from "../../../utils/marketplace.utils";
import { Params, QueryString, schema } from "./get.schema";
import {
  getHoldingsByWallet,
  getUniqueWallets,
  getUserByWallet,
} from "./get.utils";

/** Fetch the user object from firestore and the marketplace subgraph */
const handler = (fastify: FastifyInstance) =>
  async function (
    request: FastifyRequest<{
      Params: Static<typeof Params>;
      Querystring: Static<typeof QueryString>;
    }>,
    reply: FastifyReply
  ): Promise<User | void> {
    const { query, params } = request;

    const walletOrHandle = params.walletOrHandle.toLowerCase();

    // If handle is provided, we must do a profile lookup first.
    let handleProfile;
    if (!utils.isAddress(walletOrHandle)) {
      handleProfile = await getProfileByHandle({
        firebase: fastify.firebase,
        handle: walletOrHandle,
      });
      // if there is no profile, we can't continue without an address
      if (!handleProfile || !utils.isAddress(handleProfile.address)) {
        return reply.notFound("No user profile found for given handle.");
      }
    }
    const address = handleProfile?.address || walletOrHandle; // now we know we have an address
    const [profile, user, assets] = await Promise.all([
      handleProfile ||
        getProfileByAddress({ firebase: fastify.firebase, address }),
      getUserByWallet({
        address,
        network: query.network,
        expiresAfter: query.expiresAfter,
      }),
      getHoldingsByWallet({ address, network: query.network }),
    ]);

    // TODO: user more performant util here
    const UserProfilesMap = await getUserProfilesByIds({
      firebase: fastify.firebase,
      addresses: getUniqueWallets(user?.activities ?? []),
    });

    let activities =
      user?.activities?.map((a): Activity => {
        // remember: not all users have profiles.
        const buyer = !!a.buyer?.id && {
          id: a.buyer.id,
          handle: UserProfilesMap.get(a.buyer.id.toLowerCase())?.handle || null,
        };
        const seller = !!a.seller?.id && {
          id: a.seller.id,
          handle:
            UserProfilesMap.get(a.seller.id.toLowerCase())?.handle || null,
        };
        return {
          ...a,
          amount: utils.formatUnits(a.amount || "0", 18),
          price: utils.formatUnits(a.price || "0", 6),
          previousAmount: utils.formatUnits(a.previousAmount || "0", 18),
          previousPrice: utils.formatUnits(a.previousPrice || "0", 6),
          buyer: buyer || null,
          seller: seller || null,
        };
      }) || [];

    let listings = user?.listings?.map(formatListing) || [];

    // TEMP HOTFIX until we have a mainnet graph url
    // https://github.com/KlimaDAO/klimadao/issues/1604
    if (listings.length && request.query.network !== "mumbai") {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- temp fix
      listings = [] as Listing[];
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- temp fix
      activities = [] as Activity[];
    }

    const response: User = {
      createdAt: profile?.createdAt || 0,
      description: profile?.description || "", // TODO extract to nullable `profile` property.
      handle: profile?.handle || "",
      profileImgUrl: profile?.profileImgUrl || null,
      updatedAt: profile?.updatedAt || 0,
      username: profile?.username || "",
      listings,
      activities,
      assets,
      wallet: address,
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
