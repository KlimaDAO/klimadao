import { poolInfo } from "../constants/constants";
const { executeGraphQLQuery } = require("../apollo-client");
const { POOL_PROJECTS } = require("../queries/pool_project");
// @ts-check

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
 */

/**
 * @typedef {Object} Params
 * @property {string} key - Project key `"VCS-981"`
 * @property {string} vintageStr - Vintage string `"2017"`
 */

/**
 * Query the subgraph for a list of the C3Ts and TCO2s that exist for a given project-vintage combination.
 * @param {Params} params
 *  @example fetchCarbonProjectTokens({ key: "VCS-981", vintageStr: "2017" })
 * @returns {Promise<PoolInfoMap>}
 * A map of project token info for each pool. For example VCS-981-2017 has been bridged to a C3T (pooled in NBO) and a TCO2 (pooled in NCT)
 */
export const fetchProjectPoolInfo = async (params) => {
  const { data } = await executeGraphQLQuery(
    process.env.CARBON_OFFSETS_GRAPH_API_URL, // polygon-bridged-carbon subgraph
    POOL_PROJECTS,
    { key: params.key, vintageStr: params.vintageStr }
  );

  /** @type {QueryResponse[]} */
  const tokens = data?.carbonOffsets?.length ? data.carbonOffsets : [];

  return Object.keys(poolInfo).reduce((prevMap, poolName) => {
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
          ? matchingTokenInfo.tokenAddress ===
            poolInfo[poolName].defaultProjectTokenAddress
          : "",
        projectTokenAddress: matchingTokenInfo
          ? matchingTokenInfo.tokenAddress
          : "",
      },
    };
  }, {});
};
