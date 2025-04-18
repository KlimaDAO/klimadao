import { useQuery } from "@tanstack/react-query";
import { ERC20_ABI } from "abis/ERC20";
import { VAULT_ABI } from "abis/Vault";
import { LiquidityPool, VaultInfo } from "lib/types";
import { Address } from "viem";
import { usePublicClient } from "wagmi";
import { useAvailableLP } from "./useAvailablePool";

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
          const vaultContract = {
            address: pool.vault,
            abi: VAULT_ABI,
          };

          // Get LP contract
          const lpContract = {
            address: pool.poolAddress,
            abi: LP_ABI,
          };

          const [
            name,
            symbol,
            decimals,
            totalSupply,
            pricePerShare,
            available,
            vaultValue,
            strategy,
            wantToken,
            token0Address,
            token1Address,
            [reserve0, reserve1],
            lpTotalSupply,
          ] = await publicClient.multicall({
            allowFailure: false, // throw if any of the inner calls reverts
            contracts: [
              { ...vaultContract, functionName: "name" },
              { ...vaultContract, functionName: "symbol" },
              { ...vaultContract, functionName: "decimals" },
              { ...vaultContract, functionName: "totalSupply" },
              { ...vaultContract, functionName: "getPricePerFullShare" },
              { ...vaultContract, functionName: "available" },
              { ...vaultContract, functionName: "balance" },
              { ...vaultContract, functionName: "strategy" },
              { ...vaultContract, functionName: "want" },
              { ...lpContract, functionName: "token0" },
              { ...lpContract, functionName: "token1" },
              { ...lpContract, functionName: "getReserves" },
              { ...lpContract, functionName: "totalSupply" },
            ],
          });

          // Get token contracts
          const token0Contract = {
            address: token0Address,
            abi: ERC20_ABI,
          };

          const token1Contract = {
            address: token1Address,
            abi: ERC20_ABI,
          };

          const [token0Symbol, token0Decimals, token1Symbol, token1Decimals] =
            await publicClient.multicall({
              allowFailure: false, // throw if any of the inner calls reverts
              contracts: [
                { ...token0Contract, functionName: "symbol" },
                { ...token0Contract, functionName: "decimals" },
                { ...token1Contract, functionName: "symbol" },
                { ...token1Contract, functionName: "decimals" },
              ],
            });

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
          const vaultValueUSD =
            Number(vaultValue) * (totalPoolValue / Number(lpTotalSupply));

          return {
            address: pool.vault as Address,
            name,
            symbol,
            decimals,
            totalSupply,
            pricePerShare,
            available,
            vaultValue,
            strategy,
            wantToken,
            vaultValueUSD,
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
            totalSupply: BigInt(0),
            pricePerShare: BigInt(0),
            available: BigInt(0),
            vaultValue: BigInt(0),
            vaultValueUSD: 0,
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
