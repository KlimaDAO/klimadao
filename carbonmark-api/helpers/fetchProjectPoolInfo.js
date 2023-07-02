// @ts-check
const { executeGraphQLQuery } = require("../apollo-client");
const poolInfo = require("../constants/constants");
const POOL_PROJECTS = require("../queries/pool_project");

/**
 * @typedef {"bct" | "nct" | "ubo" | "nbo"} PoolName
 */

/**
 * @typedef {Object} PoolInfo
 *   Map the subgraph data to a more easily consumable object
 * @property {PoolName} poolName
 *   Name of the pool
 * @property {string} supply
 *   The number of tokens in the pool available for retirement
 * @property {string} poolAddress
 *   The address of the pool / pool token
 * @property {string} projectTokenAddress
 *   The address of the project token in the pool
 * @property {boolean} isPoolDefault
 *   If true, the project does not have a selective redemption fee. Each pool has 1 default project.
 */

/**
 * @typedef {{ bct: PoolInfo, nct: PoolInfo, ubo: PoolInfo, nbo: PoolInfo }} PoolInfoMap
 */

/**
 * @typedef {Object} QueryResponse
 *  See subgraph query, this typedef is not complete
 * @property {"C3" | "Toucan"} bridge
 * @property {string} balanceUBO
 * @property {string} balanceNBO
 * @property {string} balanceNCT
 * @property {string} balanceBCT
 * @property {string} tokenAddress
 * @property {string} totalBridged
 * @property {string} totalRetired
 * @property {string} currentSupply
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
 * Query the subgraph for a list of the C3Ts and TCO2s that exist for a given project-vintage combination.
 * @param {Params} params
 *  @example fetchCarbonProjectTokens({ key: "VCS-981", vintage: "2017" })
 * @returns {Promise<[PoolInfoMap, Stats]>}
 * A map of project token info for each pool. For example VCS-981-2017 has been bridged to a C3T (pooled in NBO) and a TCO2 (pooled in NCT)
 */
const fetchProjectPoolInfo = async (params) => {
  const { data } = await executeGraphQLQuery(
    process.env.CARBON_OFFSETS_GRAPH_API_URL, // polygon-bridged-carbon subgraph
    POOL_PROJECTS,
    { key: params.key, vintageStr: params.vintage }
  );

  /** @type {QueryResponse[]} */
  const tokens = data?.carbonOffsets?.length ? data.carbonOffsets : [];

  /** @type {Stats} */
  const initialStats = {
    totalBridged: 0,
    totalRetired: 0,
    totalSupply: 0,
  };

  const stats = tokens.reduce((stat, token) => {
    return {
      totalBridged: stat.totalBridged + Number(token.totalBridged),
      totalRetired: stat.totalRetired + Number(token.totalRetired),
      totalSupply: stat.totalSupply + Number(token.currentSupply),
    };
  }, initialStats);

  /** @type {any} */
  const initialMap = {};

  const poolInfoMap = Object.keys(poolInfo).reduce((prevMap, poolName) => {
    const balanceKey = `balance${poolName.toUpperCase()}`; // e.g. "balanceBCT"
    // see if any of the entries from the subgraph have a balance > 1, otherwise return "0"
    const matchingTokenInfo = tokens.find((t) => Number(t[balanceKey]) > 1);
    return {
      ...prevMap,
      [poolName]: {
        poolName,
        supply: matchingTokenInfo ? matchingTokenInfo[balanceKey] : "0",
        poolAddress: poolInfo[poolName].poolAddress,
        isPoolDefault: matchingTokenInfo
          ? matchingTokenInfo.tokenAddress.toLowerCase() ===
            poolInfo[poolName].defaultProjectTokenAddress.toLowerCase()
          : false,
        projectTokenAddress: matchingTokenInfo
          ? matchingTokenInfo.tokenAddress
          : "",
      },
    };
  }, initialMap);

  return [poolInfoMap, stats];
};

module.exports = {
  fetchProjectPoolInfo,
};
