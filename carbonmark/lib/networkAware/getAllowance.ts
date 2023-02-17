import { getAllowance as IGetAllowance } from "@klimadao/lib/utils";
import { config } from "lib/constants";

/** Fetch an allowance based on the given `network` parameter, fallback to config.defaultNetwork */
export const getAllowance = (params: Parameters<typeof IGetAllowance>[0]) => {
  const { network = config.defaultNetwork } = params;
  return IGetAllowance({
    ...params,
    network,
  });
};
