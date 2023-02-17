import { getContract as IGetContract } from "@klimadao/lib/utils";
import { Contract } from "ethers";
import { config } from "lib/constants";

/** Grab a contract based on the given `network` parameter, fallback to config.defaultNetwork */
export const getContract = (
  params: Parameters<typeof IGetContract>[0]
): Contract => {
  const { network = config.defaultNetwork } = params;
  return IGetContract({ ...params, network });
};
