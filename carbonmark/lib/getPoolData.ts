import { CarbonToken, PoolToken, poolTokens } from "@klimadao/lib/constants";
import { Price } from "lib/types/carbonmark";

export const isPoolToken = (str: string): str is PoolToken =>
  !!poolTokens.includes(str as PoolToken);

export const getPoolTokenType = (pool: Uppercase<PoolToken>): CarbonToken =>
  pool === "BCT" || pool === "NCT" ? "tco2" : "c3t";

export const getDefaultPoolFromPrices = (prices: Price[]) =>
  prices.find((p) => p.isPoolDefault);
