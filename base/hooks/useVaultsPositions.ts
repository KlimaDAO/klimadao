import { useQuery } from "@tanstack/react-query";

import { LiquidityPool, Position } from "lib/types";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { useAvailableLP } from "./useAvailablePool";
import { VaultInfo, useBeefyVaultsData } from "./useBeefyVaultsData";

// Helper function to calculate BigInt exponentiation
const getBigIntDecimals = (decimals: number): bigint => {
  let result = BigInt(1);
  for (let i = 0; i < decimals; i++) {
    result *= BigInt(10);
  }
  return result;
};

// Helper to serialize vault addresses for query key
const serializeQueryKey = (vaultsData: any[] | undefined) => {
  if (!vaultsData) return [];
  return vaultsData.map((vault) => vault.address);
};

export const useVaultsPositions = () => {
  const { address: userAddress } = useAccount();

  const { data: vaultsData } = useBeefyVaultsData();
  const { lps } = useAvailableLP();

  return useQuery({
    queryKey: ["positions", userAddress, serializeQueryKey(vaultsData)],
    queryFn: async (): Promise<Position[]> => {
      if (!vaultsData || !lps || !userAddress) return [];

      // Transform vault data into positions
      const positions: Position[] = vaultsData
        .map((vault: VaultInfo) => {
          try {
            // Find corresponding LP info
            const lpInfo = Object.values(lps).find(
              (lp: LiquidityPool) => lp.vault === vault.address
            );

            if (!lpInfo) return null;

            // Calculate user's balance in LP tokens
            const userBalanceInVaultTokens = vault.vaultValue;

            const pricePerShare = vault.pricePerShare;

            const decimalsMultiplier = getBigIntDecimals(vault.decimals);

            const userLPTokens =
              (userBalanceInVaultTokens * pricePerShare) / decimalsMultiplier;

            // Calculate user's balance in USD
            const userBalanceUSD = vault.vaultValueUSD || 0;

            // Calculate yield (this is an example - you might want to adjust the calculation based on your needs)
            const yieldUSD = userBalanceUSD * 0.1; // 10% yield for example
            const yieldLPTokens =
              Number(formatUnits(userLPTokens, vault.decimals)) * 0.1;

            // Calculate TVL
            const tvlBigInt = vault.totalSupply * vault.pricePerShare;
            const doubleDecimalMultiplier = getBigIntDecimals(
              vault.decimals * 2
            );
            const tvlUSD = Number(formatUnits(tvlBigInt, vault.decimals * 2));
            const tvlVaultTokens = Number(
              formatUnits(vault.totalSupply, vault.decimals)
            );

            return {
              lpToken: lpInfo,
              balance: {
                usd: userBalanceUSD,
                lpTokens: Number(formatUnits(userLPTokens, vault.decimals)),
              },
              yield: {
                usd: yieldUSD,
                lpTokens: yieldLPTokens,
              },
              tvl: {
                usd: tvlUSD,
                vaultTokens: tvlVaultTokens,
              },
            } as Position;
          } catch (error) {
            console.error(`Error processing vault ${vault.address}:`, error);
            return null;
          }
        })
        .filter(Boolean) as Position[];

      return positions;
    },
    enabled: userAddress && !!vaultsData && !!lps,
  });
};
