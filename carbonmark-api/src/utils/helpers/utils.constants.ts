import { TOKEN_ADDRESSES } from "../../app.constants";

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- unable to type environment variables
const ENV = (
  process.env.VERCEL_ENV !== "production" ? "development" : "production"
) as "development" | "production";

export const TOKEN_POOLS = [
  {
    name: "ubo",
    address: TOKEN_ADDRESSES[ENV].LP_UBO_POOL,
    feeAdd: true, // C3 contracts: input the desired tonnage to redeem -> approve and spend that cost PLUS fee
    fee: 0.0225,
  },
  {
    name: "nbo",
    address: TOKEN_ADDRESSES[ENV].LP_NBO_POOL,
    feeAdd: true,
    fee: 0.0225,
  },
  {
    name: "ntc",
    address: TOKEN_ADDRESSES[ENV].LP_NTC_POOL,
    feeAdd: false, // Toucan contracts: fee is subtracted from whatever value you input
    fee: 0.1,
  },
  {
    name: "btc",
    address: TOKEN_ADDRESSES[ENV].LP_BTC_POOL,
    feeAdd: false,
    fee: 0.25,
  },
] as const;

export const MOSS_POOL = TOKEN_ADDRESSES[ENV].MOSS_POOL;

export type TokenPool = (typeof TOKEN_POOLS)[number];

/** The value by which to truncate token prices */
export const POOL_PRICE_DECIMALS = 1e6;
