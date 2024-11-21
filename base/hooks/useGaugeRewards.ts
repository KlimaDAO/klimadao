import { useMemo } from "react";
import { Address, formatUnits } from "viem";
import { useContractRead } from "wagmi";
import { useGaugeData } from "./useGaugeData";
import { useLPPrice } from "./useLpPrices";
import { useTokenPrices } from "./useTokenPrice";

const gaugeABI = [
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256", name: "" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

interface GaugeRewards {
  // USD Values
  dailyRewardsUSD: number;
  weeklyRewardsUSD: number;
  annualRewardsUSD: number;

  // Rates
  apr: number;
  apy: number; // Daily autocompound APY
  dailyRate: number; // Daily return with autocompound

  // Time info
  epochStart: number;
  epochEnd: number;

  // State
  isLoading: boolean;
  isError: boolean;
}

export const useGaugeRewards = ({
  gaugeAddress,
  lpAddress,
}: {
  gaugeAddress: Address;
  lpAddress: Address;
}): GaugeRewards => {
  const {
    rewardRate,
    epochStart,
    epochEnd,
    isLoading: isLoadingGauge,
    isError: isErrorGauge,
  } = useGaugeData(gaugeAddress);

  const { tokenData } = useTokenPrices({
    tokens: [{ symbol: "AERO" }],
  });

  const aeroPrice = useMemo(
    () => tokenData[0]?.quote.USD.price || 0,
    [tokenData]
  );

  const { data: lpData, isLoading: isLoadingLP } = useLPPrice({
    lpAddress,
    enabled: !!lpAddress,
  });

  const { data: totalStaked, isLoading: isLoadingStaked } = useContractRead({
    address: gaugeAddress,
    abi: gaugeABI,
    functionName: "totalSupply",
    enabled: !!gaugeAddress,
  });

  const rewards = useMemo(() => {
    const isLoading = isLoadingGauge || isLoadingLP || isLoadingStaked;
    const isError = isErrorGauge;

    // Time constants
    const SECONDS_PER_DAY = 24 * 60 * 60; // 86400 seconds
    const SECONDS_PER_WEEK = 7 * SECONDS_PER_DAY; // 604800 seconds
    const SECONDS_PER_YEAR = 365 * SECONDS_PER_DAY; // 31536000 seconds
    const COMPOUNDS_PER_YEAR = 365; // Daily autocompounding

    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Default values
    const defaultValues = {
      dailyRewardsUSD: 0,
      weeklyRewardsUSD: 0,
      annualRewardsUSD: 0,
      apr: 0,
      apy: 0,
      dailyRate: 0,
      epochStart,
      epochEnd,
      isLoading,
      isError,
    };

    if (
      isLoading ||
      isError ||
      currentTimestamp < epochStart ||
      currentTimestamp > epochEnd
    ) {
      return defaultValues;
    }

    // Calculate remaining time
    const remainingTime = epochEnd - currentTimestamp;

    // Calculate base rewards in USD
    const timeFrameDay = Math.min(SECONDS_PER_DAY, remainingTime);
    const timeFrameWeek = Math.min(SECONDS_PER_WEEK, remainingTime);

    const dailyRewards = rewardRate * timeFrameDay;
    const weeklyRewards = rewardRate * timeFrameWeek;
    const annualRewards = (weeklyRewards / timeFrameWeek) * SECONDS_PER_YEAR;

    const dailyRewardsUSD = dailyRewards * aeroPrice;
    const weeklyRewardsUSD = weeklyRewards * aeroPrice;
    const annualRewardsUSD = annualRewards * aeroPrice;

    // Calculate total staked value
    const lpPrice = lpData?.pricePerLPToken || 0;
    const totalStakedLP = totalStaked
      ? Number(formatUnits(totalStaked, 18))
      : 0;
    const totalStakedValue = totalStakedLP * lpPrice;

    // Calculate APR
    const apr =
      totalStakedValue > 0 ? (annualRewardsUSD / totalStakedValue) * 100 : 0;

    // Calculate APY with daily autocompounding
    // Formula: APY = (1 + APR/(100 * 365))^365 - 1
    const aprDecimal = apr / 100;
    const apy =
      (Math.pow(1 + aprDecimal / COMPOUNDS_PER_YEAR, COMPOUNDS_PER_YEAR) - 1) *
      100;

    // Calculate daily rate with autocompounding
    // This is the actual daily return when considering compounding effects
    const dailyRate = (Math.pow(1 + apy / 100, 1 / 365) - 1) * 100;

    return {
      dailyRewardsUSD,
      weeklyRewardsUSD,
      annualRewardsUSD,
      apr,
      apy,
      dailyRate,
      epochStart,
      epochEnd,
      isLoading,
      isError,
    };
  }, [
    rewardRate,
    epochStart,
    epochEnd,
    aeroPrice,
    lpData,
    totalStaked,
    isLoadingGauge,
    isLoadingLP,
    isLoadingStaked,
    isErrorGauge,
  ]);

  return rewards;
};
