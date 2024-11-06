import { useQuery } from "@tanstack/react-query";
import { LiquidityPool } from "lib/constants";
import { Address, getContract } from "viem";
import { usePublicClient } from "wagmi";
import { useAvailableLP } from "./useAvailablePool";

interface VaultInfo {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
  pricePerShare: bigint;
  available: bigint;
  balance: bigint;
  apy?: number;
  apr?: number;
  dailyRate?: number;
  strategy: Address;
  wantToken: Address;
  // Add USD value fields
  balanceUSD?: number; // USD value of vault's total balance
}

const ERC20_ABI = [
  {
    name: "symbol",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "string", name: "" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8", name: "" }],
  },
] as const;

// LP contract ABI just for getting reserves
const LP_ABI = [
  {
    name: "getReserves",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { type: "uint112", name: "_reserve0" },
      { type: "uint112", name: "_reserve1" },
      { type: "uint32", name: "_blockTimestampLast" },
    ],
  },
  {
    name: "totalSupply",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256", name: "" }],
  },
  {
    name: "token0",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address", name: "" }],
  },
  {
    name: "token1",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address", name: "" }],
  },
] as const;

async function fetchMultiplePrices(
  symbols: string[]
): Promise<Record<string, number>> {
  try {
    const uniqueSymbols = [...new Set(symbols)];
    const symbolsString = uniqueSymbols.join(",");

    const response = await fetch(`/api/prices?symbols=${symbolsString}`);
    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }

    const data = await response.json();

    return uniqueSymbols.reduce(
      (acc, symbol) => {
        const price = data.data?.[symbol]?.[0]?.quote?.USD?.price ?? 0;
        acc[symbol] = price;
        return acc;
      },
      {} as Record<string, number>
    );
  } catch (error) {
    console.error("Error fetching multiple prices:", error);
    return {};
  }
}

export interface VaultInfo {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
  pricePerShare: bigint;
  available: bigint;
  balance: bigint;
  apy?: number;
  apr?: number;
  dailyRate?: number;
  strategy: Address;
  wantToken: Address;
  balanceUSD?: number;
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

export const useBeefyVaultsData = () => {
  const publicClient = usePublicClient();
  const { lps: pools } = useAvailableLP();

  return useQuery({
    queryKey: ["beefy-vaults-data", pools ? Object.keys(pools) : []],
    queryFn: async (): Promise<VaultInfo[]> => {
      if (!pools) return [];

      const poolsArray = Object.values(pools);

      const vaultPromises = poolsArray.map(async (pool: LiquidityPool) => {
        try {
          const contract = getContract({
            address: pool.vault as Address,
            abi: VAULT_ABI,
            publicClient,
          });

          const [
            name,
            symbol,
            decimals,
            totalSupply,
            pricePerShare,
            available,
            balance,
            strategy,
            wantToken,
          ] = await Promise.all([
            contract.read.name(),
            contract.read.symbol(),
            contract.read.decimals(),
            contract.read.totalSupply(),
            contract.read.getPricePerFullShare(),
            contract.read.available(),
            contract.read.balance(),
            contract.read.strategy(),
            contract.read.want(),
          ]);

          // Get LP contract
          const lpContract = getContract({
            address: pool.poolAddress,
            abi: LP_ABI,
            publicClient,
          });

          // Get token addresses from LP contract
          const [token0Address, token1Address] = await Promise.all([
            lpContract.read.token0(),
            lpContract.read.token1(),
          ]);

          // Get token contracts
          const token0Contract = getContract({
            address: token0Address,
            abi: ERC20_ABI,
            publicClient,
          });

          const token1Contract = getContract({
            address: token1Address,
            abi: ERC20_ABI,
            publicClient,
          });

          // Get token info
          const [
            [token0Symbol, token0Decimals],
            [token1Symbol, token1Decimals],
            [reserve0, reserve1],
            lpTotalSupply,
          ] = await Promise.all([
            Promise.all([
              token0Contract.read.symbol(),
              token0Contract.read.decimals(),
            ]),
            Promise.all([
              token1Contract.read.symbol(),
              token1Contract.read.decimals(),
            ]),
            lpContract.read.getReserves(),
            lpContract.read.totalSupply(),
          ]);

          // Get prices using actual token symbols
          const prices = await fetchMultiplePrices([
            token0Symbol,
            token1Symbol,
          ]);

          // Calculate total pool value in USD
          const token0USD =
            (Number(reserve0) * (prices[token0Symbol] ?? 0)) /
            10 ** token0Decimals;

          const token1USD =
            (Number(reserve1) * (prices[token1Symbol] ?? 0)) /
            10 ** token1Decimals;

          const totalPoolValue = token0USD + token1USD;

          // Calculate vault's balance in USD
          const balanceUSD =
            Number(balance) * (totalPoolValue / Number(lpTotalSupply));

          return {
            address: pool.vault as Address,
            name,
            symbol,
            decimals,
            totalSupply,
            pricePerShare,
            available,
            balance,
            strategy,
            wantToken,
            balanceUSD,
            underlyingTokens: {
              token0: {
                address: token0Address,
                symbol: token0Symbol,
                decimals: token0Decimals,
              },
              token1: {
                address: token1Address,
                symbol: token1Symbol,
                decimals: token1Decimals,
              },
            },
          } satisfies VaultInfo;
        } catch (error) {
          console.error(`Error fetching data for vault ${pool.vault}:`, error);
          // Return basic data even if USD calculation fails
          return {
            address: pool.vault as Address,
            name: "Error",
            symbol: "ERR",
            decimals: 18,
            totalSupply: 0n,
            pricePerShare: 0n,
            available: 0n,
            balance: 0n,
            strategy: "0x" as Address,
            wantToken: "0x" as Address,
          };
        }
      });

      return Promise.all(vaultPromises);
    },
    enabled: !!publicClient && !!pools && Object.keys(pools).length > 0,
  });
};

const VAULT_ABI = [
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approvalDelay",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "available",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balance",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPricePerFullShare",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "stratCandidate",
    inputs: [],
    outputs: [
      { name: "implementation", type: "address" },
      { name: "proposedTime", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "strategy",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "want",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
] as const;
