import { getContract as IGetContract } from "@klimadao/lib/utils";
import { Contract } from "ethers";
import { DEFAULT_NETWORK } from "lib/constants";

/** Grab a contract based on the given `network` parameter, fallback to DEFAULT_NETWORK */
export const getContract = (
  params: Parameters<typeof IGetContract>[0]
): Contract => {
  const { network = DEFAULT_NETWORK } = params;
  return IGetContract({ ...params, network });
};
