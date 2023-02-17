import { getTokenDecimals as IGetTokenDecimals } from "@klimadao/lib/utils";
import { config } from "lib/constants";

/** Get decimals based on the given `network` parameter, fallback to config.defaultNetwork */
export const getTokenDecimals = (
  tkn: string,
  network?: "testnet" | "mainnet"
): 9 | 6 | 18 => {
  return IGetTokenDecimals(tkn, network ?? config.defaultNetwork);
};
