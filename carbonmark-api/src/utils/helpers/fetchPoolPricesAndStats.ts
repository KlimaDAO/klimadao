import { get } from "lodash";
import { NetworkParam } from "../../models/NetworkParam.model";
import { TokenPriceT } from "../../models/TokenPrice.model";
import { GQL_SDK } from "../gqlSdk";
import { fetchAllPoolPrices } from "./fetchAllPoolPrices";
import { fetchProjectPoolInfo, Stats } from "./fetchProjectPoolInfo";

export const getTokenById = async (
  sdk: GQL_SDK,
  id: string
): Promise<{ symbol: string }> => {
  const query = await sdk.digital_carbon.getTokenById({ id });

  if (!query.token) {
    throw new Error(`Token with id '${id}' not found`);
  }

  return {
    symbol: query.token.symbol,
  };
};

type Params = {
  key: string; // Project key `"VCS-981"`
  vintage: string; // Vintage string `"2017"`
  network: NetworkParam;
};

/**
 * Does 2 parallel subgraph requests, merges the results into a complete array of pool prices for a given project-vintage
 * @param {Params} params - e.g. `{ key: "VCS-981", vintage: "2017" }`
 * @returns {Promise<[ProjectPoolPrice[], Stats]>} - 1 entry for each asset. For example VCS-981-2017 has been bridged to a C3T (pooled in NBO) and a TCO2 (pooled in NCT)
 */
export const fetchPoolPricesAndStats = async (
  sdk: GQL_SDK,
  params: Params
): Promise<[TokenPriceT[], Stats]> => {
  if (params.network !== "polygon") {
    return [[], { totalBridged: 0, totalSupply: 0, totalRetired: 0 }];
  }
  const [[poolInfoMap, stats], allPoolPrices] = await Promise.all([
    fetchProjectPoolInfo(sdk, {
      projectID: params.key,
      vintage: Number(params.vintage),
    }),
    fetchAllPoolPrices(sdk), // fetch the price for all known lps
  ]);
  /** @type {ProjectPoolPrice[]} */
  const initialPrices: TokenPriceT[] = [];
  // convert the map to an array of prices, filter out any pools that don't have a supply
  const poolPrices = Object.keys(poolInfoMap).reduce((arr, poolName) => {
    const poolInfo = get(poolInfoMap, poolName);
    if (!Number(poolInfo.supply)) return arr;
    arr.push({
      ...poolInfo,
      singleUnitPrice: poolInfo.isPoolDefault
        ? allPoolPrices[poolName].defaultPrice
        : allPoolPrices[poolName].selectiveRedeemPrice,
      singleUnitBuyPrice: allPoolPrices[poolName].selectiveRedeemPrice,
      singleUnitSellPrice: allPoolPrices[poolName].selectiveRetirePrice,
    });
    return arr;
  }, initialPrices);
  return [poolPrices, stats];
};
