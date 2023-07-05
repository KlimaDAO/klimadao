// @ts-check
const { fetchAllPoolPrices } = require("./fetchAllPoolPrices");
const { fetchProjectPoolInfo } = require("./fetchProjectPoolInfo");

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
 * @property {string} singleUnitPrice
 *   Pool price including any selection fees (for non-default projects), excluding 1% aggregator fee and sushiswap fees
 */

/**
 * @typedef {Object} Stats
 *   Stats for all project tokens across both bridges
 * @property {number} totalBridged
 * @property {number} totalRetired
 * @property {number} totalSupply
 */

/**
 * @typedef {Object} Params
 * @property {string} key - Project key `"VCS-981"`
 * @property {string} vintage - Vintage string `"2017"`
 */

/**
 * Does 2 parallel subgraph requests, merges the results into a complete array of pool prices for a given project-vintage
 * @param {Params} params - e.g. `{ key: "VCS-981", vintage: "2017" }`
 * @returns {Promise<[ProjectPoolPrice[], Stats]>} - 1 entry for each asset. For example VCS-981-2017 has been bridged to a C3T (pooled in NBO) and a TCO2 (pooled in NCT)
 */
const fetchPoolPricesAndStats = async (params) => {
  try {
    const [[poolInfoMap, stats], allPoolPrices] = await Promise.all([
      fetchProjectPoolInfo({
        key: params.key,
        vintage: params.vintage,
      }),
      fetchAllPoolPrices(), // fetch the price for all known lps
    ]);
    /** @type {ProjectPoolPrice[]} */
    const initialPrices = [];
    // convert the map to an array of prices, filter out any pools that don't have a supply
    const poolPrices = Object.keys(poolInfoMap).reduce((arr, poolName) => {
      const poolInfo = poolInfoMap[poolName];
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
  } catch (error) {
    console.error("fetchPoolPrices failed", error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  fetchPoolPricesAndStats,
};
