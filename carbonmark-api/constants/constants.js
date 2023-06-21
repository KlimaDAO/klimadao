const defaultPoolProjectTokens = {
  nbo: "0xb6ea7a53fc048d6d3b80b968d696e39482b7e578",
  ubo: "0xd6ed6fae5b6535cae8d92f40f5ff653db807a4ea",
  bct: "0xb139c4cc9d20a3618e9a2268d73eff18c496b991",
  nct: "0x6362364a37f34d39a1f4993fb595dab4116daf0d",
};

const poolAddresses = {
  nbo: "0x6BCa3B77C1909Ce1a4Ba1A20d1103bDe8d222E48",
  ubo: "0x2B3eCb0991AF0498ECE9135bcD04013d7993110c",
  bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
  nct: "0xD838290e877E0188a4A44700463419ED96c16107",
};

const lpAddresses = {
  ubo: "0x5400a05b8b45eaf9105315b4f2e31f806ab706de",
  nbo: "0x251ca6a70cbd93ccd7039b6b708d4cb9683c266c",
  bct: "0x9803c7ae526049210a1725f7487af26fe2c24614",
  nct: "0xdb995f975f1bfc3b2157495c47e4efb31196b2ca",
};

/** Single Source of Truth for all pool info. Everything should derive from this.
 */
const poolInfo = {
  nbo: {
    defaultProjectTokenAddress: defaultPoolProjectTokens["nbo"],
    poolAddress: poolAddresses["nbo"],
    lpAddress: lpAddresses["nbo"],
    poolName: "nbo",
    feeAdd: true, // C3 contracts: input the desired tonnage to redeem -> approve and spend that cost PLUS fee
    fee: 0.0225,
  },
  ubo: {
    defaultProjectTokenAddress: defaultPoolProjectTokens["ubo"],
    poolAddress: poolAddresses["ubo"],
    lpAddress: lpAddresses["ubo"],
    poolName: "ubo",
    feeAdd: true, // C3 contracts: input the desired tonnage to redeem -> approve and spend that cost PLUS fee
    fee: 0.0225,
  },
  bct: {
    defaultProjectTokenAddress: defaultPoolProjectTokens["bct"],
    poolAddress: poolAddresses["bct"],
    lpAddress: lpAddresses["bct"],
    poolName: "bct",
    feeAdd: false,
    fee: 0.25,
  },
  nct: {
    defaultProjectTokenAddress: defaultPoolProjectTokens["nct"],
    poolAddress: poolAddresses["nct"],
    lpAddress: lpAddresses["nct"],
    poolName: "nct",
    feeAdd: false, // Toucan contracts: fee is subtracted from whatever value you input
    fee: 0.1,
  },
};

module.exports = {
  poolInfo,
};
