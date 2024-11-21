import { useMemo } from "react";
import { Address, formatUnits } from "viem";
import { useContractReads } from "wagmi";

// ABI for the gauge contract functions we need
const gaugeABI = [
  {
    inputs: [],
    name: "rewardRate",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "periodFinish",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastUpdateTime",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

interface GaugeData {
  rewardRate: number;
  epochStart: number;
  epochEnd: number;
  isLoading: boolean;
  isError: boolean;
}

export const useGaugeData = (gaugeAddress?: Address): GaugeData => {
  // Read multiple values from the contract at once
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: gaugeAddress,
        abi: gaugeABI,
        functionName: "rewardRate",
      },
      {
        address: gaugeAddress,
        abi: gaugeABI,
        functionName: "periodFinish",
      },
      {
        address: gaugeAddress,
        abi: gaugeABI,
        functionName: "lastUpdateTime",
      },
    ] as const,
    enabled: !!gaugeAddress,
  });

  // Process the raw data into usable format
  const gaugeData = useMemo(() => {
    if (!data || data.some((result) => result.status !== "success")) {
      return {
        rewardRate: 0,
        epochStart: 0,
        epochEnd: 0,
        isLoading,
        isError,
      };
    }

    const [rewardRateResult, periodFinishResult, lastUpdateTimeResult] = data;

    // Safely handle the bigint conversion
    const rewardRate = rewardRateResult.result
      ? Number(formatUnits(rewardRateResult.result as bigint, 18))
      : 0;

    // Convert BigInt timestamps to numbers
    const epochEnd = periodFinishResult.result
      ? Number(periodFinishResult.result)
      : 0;
    const epochStart = lastUpdateTimeResult.result
      ? Number(lastUpdateTimeResult.result)
      : 0;

    return {
      rewardRate,
      epochStart,
      epochEnd,
      isLoading,
      isError,
    };
  }, [data, isLoading, isError]);

  return gaugeData;
};
