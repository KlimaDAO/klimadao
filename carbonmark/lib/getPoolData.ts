import { CarbonToken, PoolToken, poolTokens } from "@klimadao/lib/constants";
import { getTokenDecimals, safeAdd } from "@klimadao/lib/utils";
import { utils } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { CarbonmarkPaymentMethod } from "lib/types/carbonmark";
import { TokenPrice } from "lib/types/carbonmark.types";

export const isPoolToken = (str: string): str is PoolToken =>
  !!poolTokens.includes(str as PoolToken);

export const getPoolTokenType = (pool: Uppercase<PoolToken>): CarbonToken =>
  pool === "BCT" || pool === "NCT" ? "tco2" : "c3t";

export const getDefaultPoolFromPrices = (prices: TokenPrice[]) =>
  prices.find((p) => p.isPoolDefault);

export const getPoolApprovalValue = (
  cost: string,
  paymentMethod: CarbonmarkPaymentMethod
): string => {
  if (!cost) return "0";

  const decimals = getTokenDecimals(paymentMethod);
  const onePercent = utils.parseUnits(cost, decimals).div("100");
  const total = safeAdd(cost, formatUnits(onePercent, decimals));

  return (
    Math.floor(Math.abs(Number(total)) * Math.pow(10, decimals)) /
    Math.pow(10, decimals)
  ).toString();
};
