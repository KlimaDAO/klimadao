import { Address } from "wagmi";

export interface Position {
  lpToken: LiquidityPool;
  balance: {
    usd: number;
    lpTokens: number;
  };
  yield: {
    usd: number;
    lpTokens: number;
  };
  tvl: {
    usd: number;
    vaultTokens: number;
  };
}

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

export interface Token {
  id: string;
  name: string;
  address: Address;
  decimals: number;
}
