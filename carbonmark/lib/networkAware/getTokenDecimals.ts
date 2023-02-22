import { getTokenDecimals as IGetTokenDecimals } from "@klimadao/lib/utils";
import { DEFAULT_NETWORK } from "lib/constants";

/** Get decimals based on the given `network` parameter, fallback to DEFAULT_NETWORK */
export const getTokenDecimals = (
  tkn: string,
  network?: "testnet" | "mainnet"
): 9 | 6 | 18 => {
  return IGetTokenDecimals(tkn, network ?? DEFAULT_NETWORK);
};
