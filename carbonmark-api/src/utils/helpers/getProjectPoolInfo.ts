import { ethers } from "ethers";
import { get } from "lodash";
import { POOL_INFO } from "../../routes/projects/get.constants";

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
export type BigNumberStats = {
  bridged: ethers.BigNumber;
  retired: ethers.BigNumber;
  totalSupply: ethers.BigNumber;
};

const initialStats: BigNumberStats = {
  bridged: ethers.BigNumber.from(0),
  retired: ethers.BigNumber.from(0),
  totalSupply: ethers.BigNumber.from(0),
};
export type Stats = {
  totalBridged: number;
  totalRetired: number;
  totalSupply: number;
};

/** Return Types for Digital Carbon Query */

type PoolBalance = {
  balance: string;
  id: string;
  deposited: string;
  redeemed: string;
  pool: {
    name: string;
    supply: string;
    id: string;
    decimals: number;
  };
};

type CarbonCredit = {
  vintage: number;
  currentSupply: string;
  poolBalances: PoolBalance[];
  id: string;
  crossChainSupply: string;
  bridgeProtocol: string;
  bridged: string;
  retired: string;
};

type CarbonCredits = CarbonCredit[];

/**
 * Returns a project pool info given the token credits of this project
 * @param {Params} params
 *  @example fetchCarbonProjectTokens({ key: "VCS-981", vintage: "2017" })
 * @returns {Promise<[PoolInfoMap, Stats]>}
 * A map of project token info for each pool. For example VCS-981-2017 has been bridged to a C3T (pooled in NBO) and a TCO2 (pooled in NCT)
 */
export const getProjectPoolInfo = (
  tokens: CarbonCredits
): [Partial<PoolInfoMap>, Stats] => {
  // Graph data is in 18 decimals. All operations are performed in BigNumber before converting to Number at the end
  const bigNumberStats: BigNumberStats = tokens.reduce(
    (stat, token) => ({
      bridged: stat.bridged.add(ethers.BigNumber.from(token.bridged)),
      retired: stat.retired.add(ethers.BigNumber.from(token.retired)),
      totalSupply: stat.totalSupply.add(
        ethers.BigNumber.from(token.currentSupply)
      ),
    }),
    initialStats
  );
  // project bigNumber stats
  const stats: Stats = {
    totalBridged: parseFloat(
      ethers.utils.formatUnits(bigNumberStats.bridged, 18)
    ),
    totalRetired: parseFloat(
      ethers.utils.formatUnits(bigNumberStats.retired, 18)
    ),
    totalSupply: parseFloat(
      ethers.utils.formatUnits(bigNumberStats.totalSupply, 18)
    ),
  };

  const poolInfoMap = Object.keys(POOL_INFO).reduce<Partial<PoolInfoMap>>(
    (prevMap, poolName) => {
      const poolAddress = POOL_INFO[poolName].poolAddress;
      let totalSupply = 0;
      let matchingTokenInfo: PoolBalance | undefined;
      let matchingTokenAddress: string | undefined;

      for (const token of tokens) {
        const potentialMatch = token.poolBalances.find(
          (t) => t.pool.id.toLowerCase() === poolAddress.toLowerCase()
        );

        if (potentialMatch) {
          matchingTokenInfo = potentialMatch;
          matchingTokenAddress = token.id;
          const decimals = potentialMatch.pool.decimals;
          const numberBalance = parseFloat(
            ethers.utils.formatUnits(potentialMatch.balance, decimals)
          );
          totalSupply += numberBalance;
        }
      }

      if (!matchingTokenInfo || !matchingTokenAddress) {
        return prevMap;
      }
      return {
        ...prevMap,
        [poolName]: {
          poolName,
          supply: totalSupply.toString(),
          poolAddress,
          isPoolDefault:
            matchingTokenAddress.toLowerCase() ===
            POOL_INFO[poolName].defaultProjectTokenAddress.toLowerCase(),
          projectTokenAddress: get(tokens[0], "id", ""),
        },
      };
    },
    {}
  );

  return [poolInfoMap, stats];
};
