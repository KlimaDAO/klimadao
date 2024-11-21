import { useQuery } from "@tanstack/react-query";
import { LiquidityPool, Position, VaultInfo } from "lib/types";
import { formatUnits, getContract } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { useAvailableLP } from "./useAvailablePool";
import { useBeefyVaultsData } from "./useBeefyVaultsData";

const VAULT_ABI = [
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
] as const;

export const useVaultsPositions = () => {
  const { address: userAddress } = useAccount();
  const { data: vaultsData } = useBeefyVaultsData();
  const { lps } = useAvailableLP();
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: [
      "positions",
      userAddress,
      vaultsData ? vaultsData.map((v) => v.address) : [],
    ],
    queryFn: async (): Promise<Position[]> => {
      if (!vaultsData || !lps || !userAddress || !publicClient) return [];

      const positions = await Promise.all(
        vaultsData.map(async (vault: VaultInfo) => {
          try {
            const lpInfo = Object.values(lps).find(
              (lp: LiquidityPool) => lp.vault === vault.address
            );

            if (!lpInfo) return null;

            // Get user's vault shares (vault tokens)
            const vaultContract = getContract({
              address: vault.address,
              abi: VAULT_ABI,
              publicClient,
            });

            const userShares = await vaultContract.read.balanceOf([
              userAddress,
            ]);

            // Calculate user's LP tokens: (totalLPTokens * userShares) / totalShares
            const userLPTokens =
              vault.totalSupply > BigInt(0)
                ? (vault.vaultValue * userShares) / vault.totalSupply
                : BigInt(0);

            const position: Position = {
              lpToken: lpInfo,
              lpBalance: {
                usd: vault.vaultValueUSD
                  ? (Number(userLPTokens) / Number(vault.vaultValue)) *
                    vault.vaultValueUSD
                  : 0,
                lpTokens: Number(formatUnits(userLPTokens, vault.decimals)),
              },
              vaultBalance: {
                vaultAddress: vault.address,
                vaultTokens: Number(formatUnits(userShares, vault.decimals)),
              },
            };

            return position;
          } catch (error) {
            console.error(`Error processing vault ${vault.address}:`, error);
            return null;
          }
        })
      );

      return positions.filter(
        (position): position is Position => position !== null
      );
    },
    enabled: userAddress && !!vaultsData && !!lps && !!publicClient,
  });
};
