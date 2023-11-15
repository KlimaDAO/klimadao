import { Contract, providers, utils } from "ethers";
import { compact, sortBy, sortedUniq } from "lodash";
import { pipe } from "lodash/fp";
import ERC20 from "../../../abis/ERC20.json";
import { RPC_URLS } from "../../../app.constants";
import { NetworkParam } from "../../../models/NetworkParam.model";
import { Holding } from "../../../types/assets.types";
import { gql_sdk } from "../../../utils/gqlSdk";

const formatHolding = (h: Holding): Holding => {
  return {
    ...h,
    amount: utils.formatUnits(h.amount, h.token.decimals),
  };
};

/** Hacky Mumbai simulation for known testnet assets
 *  until we get a testnet version of polygon-digital-carbon */
const fetchTestnetHoldings = async (params: {
  address: string;
}): Promise<Holding[]> => {
  const provider = new providers.JsonRpcProvider(RPC_URLS.polygonTestnetRpc);
  const sdk = gql_sdk("mumbai");
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

  const fetchTco2Balances = Promise.all(balancePromises);
  const fetchIcrHoldings = sdk.icr.getHoldingsByAddress({ id: params.address });

  const [tco2Balances, IcrBalances] = await Promise.all([
    fetchTco2Balances,
    fetchIcrHoldings,
  ]);

  type MultipleTokenStandardType = Holding & { token: { tokenId?: string } };

  const tco2Holdings: MultipleTokenStandardType[] = tco2Balances.map(
    (balance, i) => {
      return {
        amount: balance.toString(),
        id: `0x_mock_holding_id_${i}`,
        token: {
          decimals: 18,
          id: TOKEN_INFO.at(i)?.address ?? "",
          name: TOKEN_INFO.at(i)?.symbol ?? "",
          symbol: TOKEN_INFO.at(i)?.symbol ?? "",
        },
      };
    }
  );

  let icrHoldings: MultipleTokenStandardType[] = [];
  if (IcrBalances.holder?.exPostAmounts) {
    icrHoldings = IcrBalances.holder.exPostAmounts.map((item) => ({
      amount: utils.parseUnits(item.amount, 18).toString(),
      id: item.exPost.serialization,
      token: {
        decimals: 18,
        id: item.exPost.project.id,
        name: item.exPost.project.projectName,
        symbol: item.exPost.serialization,
        tokenId: item.exPost.tokenId,
      },
    }));
  }

  const combinedHoldings = [...tco2Holdings, ...icrHoldings];
  return combinedHoldings
    .map(formatHolding)
    .filter((h) => Number(h.amount) > 0);
};

/** Network-aware fetcher for marketplace user data (listings and activities) */
export const getUserByWallet = async (params: {
  address: string;
  network?: NetworkParam;
  expiresAfter?: string;
}) => {
  const sdk = gql_sdk(params.network);
  const expiresAfter =
    params.expiresAfter || Math.floor(Date.now() / 1000).toString();
  const { listings, activities } = await sdk.marketplace.getUserByWallet({
    wallet: params.address.toLowerCase(),
    expiresAfter,
  });
  return { listings, activities };
};

/** Network-aware fetcher for users holdings */
export const getHoldingsByWallet = async (params: {
  address: string;
  network?: NetworkParam;
}): Promise<Holding[]> => {
  if (params.network === "mumbai") {
    // we don't have a assets subgraph yet
    return await fetchTestnetHoldings({
      address: params.address,
    });
  }
  const sdk = gql_sdk(params.network);
  // @todo : should be `polygon-digital-carbon` instead of `assets` subgraph
  const { accounts } = await sdk.assets.getHoldingsByWallet({
    wallet: params.address,
  });
  return accounts.at(0)?.holdings.map(formatHolding) ?? [];
};

/** Reduce an array of activities into a deduplicated sorted array of buyer and seller address strings. */
export const getUniqueWallets = (
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
