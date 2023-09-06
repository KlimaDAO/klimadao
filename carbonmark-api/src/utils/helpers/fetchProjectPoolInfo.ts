import { ethers } from "ethers";
import { addresses } from "../../../../lib/constants/index";
import { POOL_INFO } from "../../routes/projects/projects.constants";
import { gqlSdk } from "../gqlSdk";
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

export type Stats = {
  bridged: number;
  retired: number;
  totalSupply: number;
};

/** Query Return Types */
type PoolBalance = {
  balance: string;
  id: string;
  deposited: string;
  redeemed: string;
  pool: {
    name: string;
    supply: string;
    id: string;
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

type Params = {
  projectID: string; // Project key `"VCS-981"`
  vintage: number; // Vintage Int 2017
};

type AddressRecord = {
  [key: string]: string;
};
const initialStats: BigNumberStats = {
  bridged: ethers.BigNumber.from(0),
  retired: ethers.BigNumber.from(0),
  totalSupply: ethers.BigNumber.from(0),
};

// const initialStats: Stats = {
//   bridged: 0,
//   retired: 0,
//   totalSupply: 0,
// };

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
  const data =
    await gqlSdk.digital_carbon.getCarbonProjectsByProjectIDAndVintage({
      projectID: params.projectID,
      vintage: Number(params.vintage),
    });

  // console.info("fox", data.carbonProjects);

  /** @type {QueryResponse[]} */
  // const tokens = data?.carbonProjects?.length ? data.carbonProjects : [];
  const tokens: CarbonCredits = data?.carbonProjects?.[0]?.carbonCredits || [];

  // const stats: Stats = tokens.reduce(
  //   (stat, token) => ({
  //     totalBridged: stat.totalBridged + Number(token.totalBridged),
  //     totalRetired: stat.totalRetired + Number(token.totalRetired),
  //     totalSupply: stat.totalSupply + Number(token.currentSupply),
  //   }),
  //   initialStats
  // );

  // const stats: Stats = tokens.reduce(
  //   (stat, token) => ({
  //     bridged: stat.bridged + Number(token.bridged),
  //     retired: stat.retired + Number(token.retired),
  //     totalSupply: stat.totalSupply + Number(token.currentSupply),
  //   }),
  //   initialStats
  // );

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
  // use decimals from graph for this
  const stats: Stats = {
    bridged: parseFloat(ethers.utils.formatUnits(bigNumberStats.bridged, 18)),
    retired: parseFloat(ethers.utils.formatUnits(bigNumberStats.retired, 18)),
    totalSupply: parseFloat(
      ethers.utils.formatUnits(bigNumberStats.totalSupply, 18)
    ),
  };
  console.info("stats", stats);
  const poolInfoMap = Object.keys(POOL_INFO).reduce<Partial<PoolInfoMap>>(
    (prevMap, poolName) => {
      const mainnetAddresses: AddressRecord = addresses["mainnet"];

      const poolId = mainnetAddresses[poolName];

      const matchingTokenInfo = tokens[0].poolBalances.find(
        (t) => t.pool.id.toLowerCase() === poolId.toLowerCase()
      );

      return {
        ...prevMap,
        [poolName]: {
          poolName,
          supply: matchingTokenInfo
            ? parseFloat(
                ethers.utils.formatUnits(matchingTokenInfo.balance, 18)
              )
            : "0",
          poolAddress: poolId,
          isPoolDefault:
            matchingTokenInfo?.id.toLowerCase() ===
            POOL_INFO[poolName].defaultProjectTokenAddress.toLowerCase(),
          projectTokenAddress: matchingTokenInfo ? matchingTokenInfo.id : "",
        },
      };
    },
    {}
  );

  return [poolInfoMap, stats];
};
// import { get } from "lodash";
// import { POOL_INFO } from "../../routes/projects/projects.constants";
// import { gqlSdk } from "../gqlSdk";

// type PoolName = "bct" | "nct" | "ubo" | "nbo";
// /**
//  * Map the subgraph data to a more easily consumable object
//  */
// type PoolInfo = {
//   poolName: PoolName; // Name of the pool
//   supply: string; // The number of tokens in the pool available for retirement
//   poolAddress: string; // The address of the pool / pool token
//   projectTokenAddress: string; // The address of the project token in the pool
//   isPoolDefault: boolean; // If true, the project does not have a selective redemption fee. Each pool has 1 default project.
// };

// /**
//  * Type for PoolInfoMap
//  */
// type PoolInfoMap = {
//   bct: PoolInfo;
//   nct: PoolInfo;
//   ubo: PoolInfo;
//   nbo: PoolInfo;
// };

// /**
//  * Stats for all project tokens across both bridges
//  */
// export type Stats = {
//   totalBridged: number;
//   totalRetired: number;
//   totalSupply: number;
// };

// type Params = {
//   key: string; // Project key `"VCS-981"`
//   vintage: string; // Vintage string `"2017"`
// };

// const initialStats: Stats = {
//   totalBridged: 0,
//   totalRetired: 0,
//   totalSupply: 0,
// };

// /**
//  * Query the subgraph for a list of the C3Ts and TCO2s that exist for a given project-vintage combination.
//  * @param {Params} params
//  *  @example fetchCarbonProjectTokens({ key: "VCS-981", vintage: "2017" })
//  * @returns {Promise<[PoolInfoMap, Stats]>}
//  * A map of project token info for each pool. For example VCS-981-2017 has been bridged to a C3T (pooled in NBO) and a TCO2 (pooled in NCT)
//  */
// export const fetchProjectPoolInfo = async (
//   params: Params
// ): Promise<[Partial<PoolInfoMap>, Stats]> => {
//   const data = await gqlSdk.offsets.getCarbonOffsetsByProjectAndVintage({
//     key: params.key,
//     vintageStr: params.vintage,
//   });

//   /** @type {QueryResponse[]} */
//   const tokens = data?.carbonOffsets?.length ? data.carbonOffsets : [];

//   const stats: Stats = tokens.reduce(
//     (stat, token) => ({
//       totalBridged: stat.totalBridged + Number(token.totalBridged),
//       totalRetired: stat.totalRetired + Number(token.totalRetired),
//       totalSupply: stat.totalSupply + Number(token.currentSupply),
//     }),
//     initialStats
//   );

//   const poolInfoMap = Object.keys(POOL_INFO).reduce<Partial<PoolInfoMap>>(
//     (prevMap, poolName) => {
//       const balanceKey = `balance${poolName.toUpperCase()}`; // e.g. "balanceBCT"
//       // see if any of the entries from the subgraph have a balance > 1, otherwise return "0"
//       const matchingTokenInfo = tokens.find(
//         (t) => Number(get(t, balanceKey)) > 1
//       );

//       return {
//         ...prevMap,
//         [poolName]: {
//           poolName,
//           supply: get(matchingTokenInfo, balanceKey, "0"),
//           poolAddress: POOL_INFO[poolName].poolAddress,
//           isPoolDefault:
//             matchingTokenInfo?.tokenAddress.toLowerCase() ===
//             POOL_INFO[poolName].defaultProjectTokenAddress.toLowerCase(),
//           projectTokenAddress: get(matchingTokenInfo, "tokenAddress", ""),
//         },
//       };
//     },
//     {}
//   );

//   return [poolInfoMap, stats];
// };
