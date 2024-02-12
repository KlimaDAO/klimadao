import { formatUnits, isAddress } from "ethers-v6";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IS_REGISTRY_ID } from "../../../../src/app.constants";
import { Activity } from "../../../models/Activity.model";
import { User } from "../../../models/User.model";
import { getActiveListings } from "../../../utils/helpers/listings.utils";
import {
  getProfileByAddress,
  getProfileByHandle,
  getUserProfilesByIds,
} from "../../../utils/helpers/users.utils";
import {
  formatAmountByRegistry,
  formatListing,
} from "../../../utils/marketplace.utils";
import { Params, Querystring, schema } from "./get.schema";
import {
  getHoldingsByWallet,
  getUniqueWallets,
  getUserByWallet,
} from "./get.utils";

type RequestT = FastifyRequest<{
  Params: Params;
  Querystring: Querystring;
}>;

/** Fetch the user object from firestore and the marketplace subgraph */
const handler = (fastify: FastifyInstance) =>
  async function (
    request: RequestT,
    reply: FastifyReply
  ): Promise<User | void> {
    try {
      const { query, params } = request;

      const network = query.network ?? "polygon";
      const walletOrHandle = params.walletOrHandle.toLowerCase();

      // Fetch the firebase UserProfile first
      const profile = !isAddress(walletOrHandle)
        ? await getProfileByHandle({
            firebase: fastify.firebase,
            handle: walletOrHandle,
          })
        : await getProfileByAddress({
            firebase: fastify.firebase,
            address: walletOrHandle,
          });

      // If there is no profile, we can't continue
      if (!profile) {
        return reply.notFound(
          "No user profile found for given handle or address"
        );
      }
      //Fetch marketplace and asset data
      const [user, assets] = await Promise.all([
        getUserByWallet({
          address: profile.address,
          network: network,
          expiresAfter: query.expiresAfter,
        }),
        getHoldingsByWallet({
          address: profile.address,
          network: network,
        }),
      ]);

      // TODO: user more performant util here
      const UserProfilesMap = await getUserProfilesByIds({
        firebase: fastify.firebase,
        addresses: getUniqueWallets(user?.activities ?? []),
      });

      const activities =
        user?.activities?.map((a): Activity => {
          // remember: not all users have profiles.
          const buyer = !!a.buyer?.id && {
            id: a.buyer.id,
            handle:
              UserProfilesMap.get(a.buyer.id.toLowerCase())?.handle || null,
          };
          const seller = !!a.seller?.id && {
            id: a.seller.id,
            handle:
              UserProfilesMap.get(a.seller.id.toLowerCase())?.handle || null,
          };

          const registry = a.project.key.split("-")[0];

          if (!IS_REGISTRY_ID(registry)) {
            throw new Error(
              `Invalid registry id in getUserProfilesByIds: ${registry}`
            );
          }

          return {
            ...a,
            amount: formatAmountByRegistry(registry, a.amount || "0"),
            price: formatUnits(a.price || "0", 6),
            previousAmount: formatAmountByRegistry(
              registry,
              a.previousAmount || "0"
            ),
            previousPrice: formatUnits(a.previousPrice || "0", 6),
            buyer: buyer || null,
            seller: seller || null,
          };
        }) || [];

      const listings = getActiveListings(
        user?.listings?.map(formatListing) || [],
        query.minSupply
      );

      const response: User = {
        createdAt: profile?.createdAt || 0,
        description: profile?.description || "", // TODO extract to nullable `profile` property.
        handle: profile?.handle || "",
        profileImgUrl: profile?.profileImgUrl || null,
        updatedAt: profile?.updatedAt || 0,
        username: profile?.username || "",
        wallet: profile.address,
        nonce: profile.nonce,
        listings,
        activities,
        assets,
      };

      return reply.send(response);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

export default async (fastify: FastifyInstance) =>
  await fastify.route({
    method: "GET",
    url: "/users/:walletOrHandle",
    handler: handler(fastify),
    schema,
  });
