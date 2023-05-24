import { CarbonToken, PoolToken, poolTokens } from "@klimadao/lib/constants";

export const isPoolToken = (str: string): str is PoolToken =>
  !!poolTokens.includes(str as PoolToken);

export const getPoolTokenType = (pool: Uppercase<PoolToken>): CarbonToken =>
  pool === "BCT" || pool === "NCT" ? "tco2" : "c3t";
