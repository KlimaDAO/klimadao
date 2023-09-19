import { Static } from "@sinclair/typebox";
import { Contract, JsonRpcProvider, formatUnits, isAddress } from "ethers-v6";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { compact, sortBy, sortedUniq } from "lodash";
import { pipe } from "lodash/fp";
import ERC20 from "../../abis/ERC20.json";
import { RPC_URLS } from "../../app.constants";
import { Holding } from "../../graphql/assets.types";
import { ByWalletUser } from "../../graphql/marketplace.types";
import { User as MumbaiUser } from "../../graphql/marketplaceMumbai.types";
import { NetworkParam } from "../../models/NetworkParam.model";
import { User } from "../../models/User.model";
import { gqlSdk } from "../../utils/gqlSdk";
import {
  getProfileByAddress,
  getProfileByHandle,
  getUserProfilesByIds,
} from "../../utils/helpers/users.utils";
import { Params, QueryString, schema } from "./get.schema";

/** Temporary subgraph replacement until we get a testnet version of polygon-digital-carbon */
const fetchTestnetHoldings = async (params: {
  address: string;
}): Promise<Holding[]> => {
  const provider = new JsonRpcProvider(RPC_URLS.polygonTestnetRpc);
  // we hardcode known testnet tokens here
  const TOKEN_INFO = [
    {
      symbol: "TCO2-VCS-981-2017",
      address: "0xeCF4A1B92a463C843CDcB7cb7A2F2DdFe07651BB",
      decimals: 18,
    },
    {
      symbol: "TCO2-VCS-191-2009",
      address: "0x74589F305224c9e1E8aAeb341C6a09e8709A5Dab",
      decimals: 18,
    },
    {
      symbol: "BCT",
      address: "0xf2438A14f668b1bbA53408346288f3d7C71c10a1",
      decimals: 18,
    },
    {
      symbol: "C3T-GS-500-2020",
      address: "0xa1c1cCD8C61FeC141AAed6B279Fa4400b68101d4",
      decimals: 18,
    },
  ];
  const balancePromises = TOKEN_INFO.map((tco2) =>
    new Contract(tco2.address, ERC20, provider).balanceOf(params.address)
  );
  const tco2Balances: bigint[] = await Promise.all(balancePromises);
  const holdings: Holding[] = tco2Balances.map((balance, i) => {
    return {
      amount: balance.toString(), // TODO: format bigint to float in API (breaking change)
      id: `0x_mock_holding_id_${i}`,
      token: {
        decimals: 18, // TODO: deprecate unused fields, include Project info
        id: TOKEN_INFO.at(i)?.address ?? "",
        name: TOKEN_INFO.at(i)?.symbol ?? "",
        symbol: TOKEN_INFO.at(i)?.symbol ?? "",
      },
    };
  });
  return holdings;
};

const getUserByWallet = async (params: {
  address: string;
  network?: NetworkParam;
}): Promise<ByWalletUser | MumbaiUser | undefined> => {
  const graph =
    params.network === "mumbai" ? gqlSdk.marketplaceMumbai : gqlSdk.marketplace;
  const { users } = await graph.getUserByWallet({
    wallet: params.address.toLowerCase(),
  });
  return users.at(0);
};

const getHoldingsByWallet = async (params: {
  address: string;
  network?: NetworkParam;
}): Promise<Holding[]> => {
  if (params.network === "mumbai") {
    // we don't have a assets subgraph yet
    return await fetchTestnetHoldings({
      address: params.address,
    });
  }
  // TODO: should be `polygon-digital-carbon` instead of `assets` subgraph
  const { accounts } = await gqlSdk.assets.getHoldingsByWallet({
    wallet: params.address,
  });
  return accounts.at(0)?.holdings ?? [];
};

const getUniqueWallets = (
  activities: {
    buyer?: { id?: string } | null;
    seller?: { id?: string } | null;
  }[]
): string[] => {
  const wallets = activities.flatMap<string | null>((a) => [
    a.buyer?.id?.toLowerCase() || null,
    a.seller?.id?.toLowerCase() || null,
  ]);
  const pipeline = pipe(compact, sortBy, sortedUniq);
  return pipeline(wallets);
};

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

    // If handle is provided, we must do a profile lookup first.
    let handleProfile;
    if (!isAddress(params.walletOrHandle)) {
      handleProfile = await getProfileByHandle({
        firebase: fastify.firebase,
        handle: params.walletOrHandle,
      });
      // if there is no profile, we can't continue without an address
      if (!handleProfile || !isAddress(handleProfile.address)) {
        return reply.notFound("No user profile found.");
      }
    }
    const address = handleProfile?.address || params.walletOrHandle; // now we know we have an address
    const [profile, user, assets] = await Promise.all([
      handleProfile ||
        getProfileByAddress({ firebase: fastify.firebase, address }),
      getUserByWallet({ address, network: query.network }),
      getHoldingsByWallet({ address, network: query.network }),
    ]);

    // TODO: user more performant util here
    const UserProfilesMap = await getUserProfilesByIds({
      firebase: fastify.firebase,
      addresses: getUniqueWallets(user?.activities ?? []),
    });

    const activities =
      user?.activities?.map((a) => {
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
          amount: formatUnits(a.amount || "0", 18),
          price: formatUnits(a.price || "0", 6),
          previousAmount: formatUnits(a.previousAmount || "0", 18),
          previousPrice: formatUnits(a.previousPrice || "0", 6),
          buyer: buyer || null,
          seller: seller || null,
        };
      }) || [];

    const listings =
      user?.listings?.map((l) => ({
        id: l.id,
        leftToSell: l.leftToSell,
        tokenAddress: l.tokenAddress,
        singleUnitPrice: l.singleUnitPrice,
        totalAmountToSell: l.totalAmountToSell,
      })) || [];

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
