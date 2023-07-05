export const TOKEN_POOLS = [
  {
    name: "ubo",
    address: process.env.LP_UBO_POOL,
    feeAdd: true, // C3 contracts: input the desired tonnage to redeem -> approve and spend that cost PLUS fee
    fee: 0.0225,
  },
  {
    name: "nbo",
    address: process.env.LP_NBO_POOL,
    feeAdd: true,
    fee: 0.0225,
  },
  {
    name: "ntc",
    address: process.env.LP_NTC_POOL,
    feeAdd: false, // Toucan contracts: fee is subtracted from whatever value you input
    fee: 0.1,
  },
  {
    name: "btc",
    address: process.env.LP_BTC_POOL,
    feeAdd: false,
    fee: 0.25,
  },
] as const;

export type TokenPool = (typeof TOKEN_POOLS)[number];
