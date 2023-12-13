import { CarbonToken, PoolToken, poolTokens } from "@klimadao/lib/constants";
import { getTokenDecimals, safeAdd } from "@klimadao/lib/utils";
import { parseUnits } from "ethers-v6";
import { formatUnits } from "ethers/lib/utils";
import { TokenPrice } from "lib/types/carbonmark.types";

export const isPoolToken = (str: string): str is PoolToken =>
  !!poolTokens.includes(str as PoolToken);

export const getPoolTokenType = (pool: Uppercase<PoolToken>): CarbonToken =>
  pool === "BCT" || pool === "NCT" ? "tco2" : "c3t";

export const getDefaultPoolFromPrices = (prices: TokenPrice[]) =>
  prices.find((p) => p.isPoolDefault);

export const getBestPoolFromPrices = (prices: TokenPrice[]) => {
  const pricesArray = prices.map((p) => Number(p.singleUnitPrice));
  const min = Math.min(...pricesArray);
  return prices.find((p) => Number(p.singleUnitPrice) == min);
};

export const getPoolApprovalValue = (cost: string): string => {
  if (!cost) return "0";

  const decimals = getTokenDecimals("usdc");
  const onePercent = BigInt(parseUnits(cost, decimals)) / BigInt("100");
  const total = safeAdd(cost, formatUnits(onePercent, decimals));

  return (
    Math.floor(Math.abs(Number(total)) * Math.pow(10, decimals)) /
    Math.pow(10, decimals)
  ).toString();
};
