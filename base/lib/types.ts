import { Address } from "wagmi";

export interface Position {
  lpToken: LiquidityPool;
  lpBalance: {
    usd: number;
    lpTokens: number;
  };
  vaultBalance: {
    vaultTokens: number;
    vaultAddress: Address;
  };
}

export interface LiquidityPool {
  id: string;
  name: string;
  balance?: string;
  gaugeAddress: Address;
  poolAddress: Address;
  vault: Address;
  decimals: number;
  tokenA: Token;
  tokenB: Token;
}

export interface Token {
  id: string;
  name: string;
  address: Address;
  decimals: number;
}

export interface VaultInfo {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
  pricePerShare: bigint;
  available: bigint;

  vaultValue: bigint;

  apy?: number;
  apr?: number;

  dailyRate?: number;
  strategy: Address;
  wantToken: Address;

  vaultValueUSD?: number;

  // Add underlying token info
  underlyingTokens?: {
    token0: {
      address: Address;
      symbol: string;
      decimals: number;
    };
    token1: {
      address: Address;
      symbol: string;
      decimals: number;
    };
  };
}
