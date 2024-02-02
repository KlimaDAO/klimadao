export const DEFAULT_POOL_PROJECT_TOKENS = {
  nbo: "0xd28dfeba8fb9e44b715156162c8b6076d7a95ad1",
  ubo: "0xd6ed6fae5b6535cae8d92f40f5ff653db807a4ea",
  bct: "0xb139c4cc9d20a3618e9a2268d73eff18c496b991",
  nct: "0x6362364a37f34d39a1f4993fb595dab4116daf0d",
};

const POOL_ADDRESSES = {
  nbo: "0x6bca3b77c1909ce1a4ba1a20d1103bde8d222e48",
  ubo: "0x2b3ecb0991af0498ece9135bcd04013d7993110c",
  bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
  nct: "0xd838290e877e0188a4a44700463419ed96c16107",
};

const LP_ADDRESSES = {
  ubo: "0x5400a05b8b45eaf9105315b4f2e31f806ab706de",
  nbo: "0x251ca6a70cbd93ccd7039b6b708d4cb9683c266c",
  bct: "0x9803c7ae526049210a1725f7487af26fe2c24614",
  nct: "0xdb995f975f1bfc3b2157495c47e4efb31196b2ca",
};

export type PoolInfo = {
  defaultProjectTokenAddress: string;
  poolAddress: string;
  lpAddress: string;
  poolName: string;
  poolFeeRatio: number;
  assetSwapFeeRatio: number;
  retirementServiceFeeRatio: number;
};

function c3PoolFee(fee: number) {
  return fee;
}
function toucanPoolFee(fee: number) {
  return 1 / (1 - fee) - 1;
}

/** Single Source of Truth for all pool info. Everything should derive from this.
 */
export const POOL_INFO: Record<string, PoolInfo> = {
  nbo: {
    defaultProjectTokenAddress: DEFAULT_POOL_PROJECT_TOKENS["nbo"],
    poolAddress: POOL_ADDRESSES["nbo"],
    lpAddress: LP_ADDRESSES["nbo"],
    poolName: "nbo",
    poolFeeRatio: c3PoolFee(0.025),
    assetSwapFeeRatio: 0.003,
    retirementServiceFeeRatio: 0.01,
  },
  ubo: {
    defaultProjectTokenAddress: DEFAULT_POOL_PROJECT_TOKENS["ubo"],
    poolAddress: POOL_ADDRESSES["ubo"],
    lpAddress: LP_ADDRESSES["ubo"],
    poolName: "ubo",
    poolFeeRatio: c3PoolFee(0.025),
    assetSwapFeeRatio: 0.003,
    retirementServiceFeeRatio: 0.01,
  },
  bct: {
    defaultProjectTokenAddress: DEFAULT_POOL_PROJECT_TOKENS["bct"],
    poolAddress: POOL_ADDRESSES["bct"],
    lpAddress: LP_ADDRESSES["bct"],
    poolName: "bct",
    poolFeeRatio: toucanPoolFee(0.25),
    assetSwapFeeRatio: 0.006,
    retirementServiceFeeRatio: 0.01,
  },
  nct: {
    defaultProjectTokenAddress: DEFAULT_POOL_PROJECT_TOKENS["nct"],
    poolAddress: POOL_ADDRESSES["nct"],
    lpAddress: LP_ADDRESSES["nct"],
    poolName: "nct",
    poolFeeRatio: toucanPoolFee(0.1),
    assetSwapFeeRatio: 0.003,
    retirementServiceFeeRatio: 0.01,
  },
};
