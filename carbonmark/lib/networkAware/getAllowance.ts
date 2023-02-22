import { getAllowance as IGetAllowance } from "@klimadao/lib/utils";
import { DEFAULT_NETWORK } from "lib/constants";

/** Fetch an allowance based on the given `network` parameter, fallback to DEFAULT_NETWORK */
export const getAllowance = (params: Parameters<typeof IGetAllowance>[0]) => {
  const { network = DEFAULT_NETWORK } = params;
  return IGetAllowance({
    ...params,
    network,
  });
};
