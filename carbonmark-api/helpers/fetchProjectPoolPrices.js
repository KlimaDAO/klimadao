import { fetchAllPoolPrices } from "./fetchAllPoolPrices";
import { fetchProjectPoolInfo } from "./fetchProjectPoolInfo";

/**
 * @typedef {Object} ProjectPoolPrice
 * Merges the ProjectTokenMapValue and the pool price data into a single object
 * @property {"bct" | "nct" | "ubo" | "nbo"} poolName
 *   Name of the pool
 * @property {string} supply
 *   The number of tokens in the pool available for retirement
 * @property {string} poolAddress
 *   The address of the pool / pool token
 * @property {string} projectTokenAddress
 *   The address of the project token in the pool
 * @property {boolean} isPoolDefault
 *   If true, the project does not have a selective redemption fee. Each pool has 1 default project.
 * @property {string} singleTonnePrice
 *   Pool price including any selection fees (for non-default projects), excluding 1% aggregator fee and sushiswap fees
 */

/**
 * @typedef {Object} Params
 * @property {string} key - Project key `"VCS-981"`
 * @property {string} vintageStr - Vintage string `"2017"`
 */

/**
 * Does 2 parallel subgraph requests, merges the results into a complete array of pool prices for a given project-vintage
 * @param {Params} params - e.g. `{ key: "VCS-981", vintage: "2017" }`
 * @returns {Promise<ProjectPoolPrice[]>} - 1 entry for each asset. For example VCS-981-2017 has been bridged to a C3T (pooled in NBO) and a TCO2 (pooled in NCT)
 */
export const fetchProjectPoolPrices = async (params) => {
  const [poolInfoMap, allPoolPrices] = await Promise.all([
    fetchProjectPoolInfo({
      key: params.key,
      vintageStr: params.vintageStr,
    }),
    fetchAllPoolPrices(), // fetch the price for all known lps
  ]);

  return Object.keys(poolInfoMap).reduce((arr, poolName) => {
    const poolInfo = poolInfoMap[poolName];
    const poolPrice = allPoolPrices[poolName];
    arr.push({
      ...poolInfo,
      singleTonnePrice: poolInfo.isPoolDefault
        ? poolPrice.defaultPrice
        : poolPrice.selectiveRedeemPrice,
    });
    return arr;
  }, []);
};
