import { Address, Chain } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";

/** True if actually deployed on the production domain (not a preview/staging domain, not local dev) */
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

/** True if deployment is a NextJS preview build */
export const IS_PREVIEW_BUILD =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

/** True if local development (not preview deployment) */
export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === "development";

export const supportedChains =
  IS_LOCAL_DEVELOPMENT || IS_PRODUCTION || IS_PREVIEW_BUILD
    ? [base]
    : [baseSepolia];

export const addresses = {
  polygon: {
    bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
    klima: "0x4e78011ce80ee02d2c3e649fb657e45898257815",
    retirementAggregatorV2: "0x8cE54d9625371fb2a068986d32C85De8E6e995f8",
    destinationHelperContract: "0x31Ba478443aB4c15f758B48f42509b2747D9b3Ec",
  },
  base: {
    klima: "0xDCEFd8C8fCc492630B943ABcaB3429F12Ea9Fea2",
    interchainTokenService: "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C",
    weth: "0x4200000000000000000000000000000000000006",
    usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
    aero: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
    cbbtc: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
  },
};

export interface Token {
  id: string;
  name: string;
  address: Address;
  decimals: number;
}

const TOKENS: { [key: string]: Token } = {
  weth: {
    id: "weth",
    name: "WETH",
    address: "0x4200000000000000000000000000000000000006", // Add actual address
    decimals: 18,
  },
  usdc: {
    id: "usdc",
    name: "USDC",
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Add actual address
    decimals: 6,
  },
  klima: {
    id: "klima",
    name: "KLIMA",
    address: "0xDCEFd8C8fCc492630B943ABcaB3429F12Ea9Fea2", // Add actual address
    decimals: 18,
  },
  bct: {
    id: "bct",
    name: "BCT",
    address: "0xDCEFd8C8fCc492630B943ABcaB3429F12Ea9Fea2", // Add actual address
    decimals: 18,
  },
};

export interface LiquidityPool {
  id: string;
  name: string;
  balance?: string;
  poolAddress: Address;
  vault: Address;
  decimals: number;
  tokenA: Token;
  tokenB: Token;
}

// Token mapping
export const BASE_LIQUIDITY_POOLS: { [key: string]: LiquidityPool } = {
  "weth-klima": {
    id: "weth-klima",
    name: "WETH/KLIMA",
    poolAddress: "0xB37642E87613d8569Fd8Ec80888eA6c63684E79e",
    vault: "0xb9ce6Fc2D4884c7138812F2aDea7a386CeF2b82E", // Add actual vault address
    decimals: 18,
    tokenA: TOKENS["weth"],
    tokenB: TOKENS["klima"],
  },
};

export const getLiquidityPools = (
  chain: Chain
): { [key: string]: LiquidityPool } => {
  if (chain === base) {
    return BASE_LIQUIDITY_POOLS;
  }
  return {};
};
