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
