import { getTokenDecimals as IGetTokenDecimals } from "@klimadao/lib/utils";

/** Get decimals based on the given `network` parameter, fallback to DEFAULT_NETWORK */
export const getTokenDecimals = (tkn: string): 9 | 6 | 18 => {
  return IGetTokenDecimals(tkn);
};
