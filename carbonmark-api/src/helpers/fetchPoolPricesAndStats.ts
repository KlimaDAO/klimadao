import { get } from "lodash";
import { fetchAllPoolPrices } from "./fetchAllPoolPrices";
import { fetchProjectPoolInfo } from "./fetchProjectPoolInfo";

type ProjectPoolPrice = {
  poolName: "bct" | "nct" | "ubo" | "nbo"; // Name of the pool
  supply: string; // The number of tokens in the pool available for retirement
  poolAddress: string; // The address of the pool / pool token
  projectTokenAddress: string; // The address of the project token in the pool
  isPoolDefault: boolean; // If true, the project does not have a selective redemption fee. Each pool has 1 default project.
  singleUnitPrice: string; // Pool price including any selection fees (for non-default projects), excluding 1% aggregator fee and sushiswap fees
};

type Params = {
  key: string; // Project key `"VCS-981"`
  vintage: string; // Vintage string `"2017"`
};

/**
 * Does 2 parallel subgraph requests, merges the results into a complete array of pool prices for a given project-vintage
 * @param {Params} params - e.g. `{ key: "VCS-981", vintage: "2017" }`
 * @returns {Promise<[ProjectPoolPrice[], Stats]>} - 1 entry for each asset. For example VCS-981-2017 has been bridged to a C3T (pooled in NBO) and a TCO2 (pooled in NCT)
 */
export const fetchPoolPricesAndStats = async (params: Params) => {
  const [[poolInfoMap, stats], allPoolPrices] = await Promise.all([
    fetchProjectPoolInfo({
      key: params.key,
      vintage: params.vintage,
    }),
    fetchAllPoolPrices(), // fetch the price for all known lps
  ]);
  /** @type {ProjectPoolPrice[]} */
  const initialPrices: ProjectPoolPrice[] = [];
  // convert the map to an array of prices, filter out any pools that don't have a supply
  const poolPrices = Object.keys(poolInfoMap).reduce((arr, poolName) => {
    const poolInfo = get(poolInfoMap, poolName);
    if (!Number(poolInfo.supply)) return arr;
    arr.push({
      ...poolInfo,
      singleUnitPrice: poolInfo.isPoolDefault
        ? allPoolPrices[poolName].defaultPrice
        : allPoolPrices[poolName].selectiveRedeemPrice,
    });
    return arr;
  }, initialPrices);
  return [poolPrices, stats];
};
