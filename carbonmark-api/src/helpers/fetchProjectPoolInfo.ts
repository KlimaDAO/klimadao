import { get } from "lodash";
import { POOL_INFO } from "src/routes/projects/projects.constants";
import { gqlSdk } from "src/utils/gqlSdk";

type PoolName = "bct" | "nct" | "ubo" | "nbo";
/**
 * Map the subgraph data to a more easily consumable object
 */
type PoolInfo = {
  poolName: PoolName; // Name of the pool
  supply: string; // The number of tokens in the pool available for retirement
  poolAddress: string; // The address of the pool / pool token
  projectTokenAddress: string; // The address of the project token in the pool
  isPoolDefault: boolean; // If true, the project does not have a selective redemption fee. Each pool has 1 default project.
};

/**
 * Type for PoolInfoMap
 */
type PoolInfoMap = {
  bct: PoolInfo;
  nct: PoolInfo;
  ubo: PoolInfo;
  nbo: PoolInfo;
};

/**
 * Stats for all project tokens across both bridges
 */
type Stats = {
  totalBridged: number;
  totalRetired: number;
  totalSupply: number;
};

type Params = {
  key: string; // Project key `"VCS-981"`
  vintage: string; // Vintage string `"2017"`
};

const initialStats: Stats = {
  totalBridged: 0,
  totalRetired: 0,
  totalSupply: 0,
};

/**
 * Query the subgraph for a list of the C3Ts and TCO2s that exist for a given project-vintage combination.
 * @param {Params} params
 *  @example fetchCarbonProjectTokens({ key: "VCS-981", vintage: "2017" })
 * @returns {Promise<[PoolInfoMap, Stats]>}
 * A map of project token info for each pool. For example VCS-981-2017 has been bridged to a C3T (pooled in NBO) and a TCO2 (pooled in NCT)
 */
export const fetchProjectPoolInfo = async (
  params: Params
): Promise<[Partial<PoolInfoMap>, Stats]> => {
  const data = await gqlSdk.offsets.getCarbonOffsetsByProjectAndVintage({
    key: params.key,
    vintageStr: params.vintage,
  });

  /** @type {QueryResponse[]} */
  const tokens = data?.carbonOffsets?.length ? data.carbonOffsets : [];

  const stats: Stats = tokens.reduce(
    (stat, token) => ({
      totalBridged: stat.totalBridged + Number(token.totalBridged),
      totalRetired: stat.totalRetired + Number(token.totalRetired),
      totalSupply: stat.totalSupply + Number(token.currentSupply),
    }),
    initialStats
  );

  const poolInfoMap = Object.keys(POOL_INFO).reduce<Partial<PoolInfoMap>>(
    (prevMap, poolName) => {
      const balanceKey = `balance${poolName.toUpperCase()}`; // e.g. "balanceBCT"
      // see if any of the entries from the subgraph have a balance > 1, otherwise return "0"
      const matchingTokenInfo = tokens.find(
        (t) => Number(get(t, balanceKey)) > 1
      );

      return {
        ...prevMap,
        [poolName]: {
          poolName,
          supply: get(matchingTokenInfo, balanceKey, "0"),
          poolAddress: POOL_INFO[poolName].poolAddress,
          isPoolDefault:
            matchingTokenInfo?.tokenAddress.toLowerCase() ===
            POOL_INFO[poolName].defaultProjectTokenAddress.toLowerCase(),
          projectTokenAddress: get(matchingTokenInfo, "tokenAddress", ""),
        },
      };
    },
    {}
  );

  return [poolInfoMap, stats];
};
