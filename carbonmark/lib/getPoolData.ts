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
  paymentMethod: CarbonmarkPaymentMethod,
  maxDecimals?: number
): string => {
  if (!cost) return "0";

  const onePercent = utils
    .parseUnits(cost, getTokenDecimals(paymentMethod))
    .div("100");

  const total = safeAdd(
    cost,
    formatUnits(onePercent, getTokenDecimals(paymentMethod))
  );

  if (maxDecimals) {
    return (
      Math.floor(Math.abs(Number(total)) * Math.pow(10, maxDecimals)) /
      Math.pow(10, maxDecimals)
    ).toString();
  }

  return total;
};
