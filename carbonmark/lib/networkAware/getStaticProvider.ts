import { getStaticProvider as IGetStaticProvider } from "@klimadao/lib/utils";
import { providers } from "ethers";
import { DEFAULT_NETWORK } from "lib/constants";

/** Get a static provider based on the given `chain` parameter, fallback to DEFAULT_NETWORK */
export const getStaticProvider = (
  params?: Parameters<typeof IGetStaticProvider>[0]
): providers.JsonRpcProvider => {
  const defaultChain = DEFAULT_NETWORK === "testnet" ? "mumbai" : "polygon";
  const chain = params?.chain || defaultChain;
  return IGetStaticProvider({ ...params, chain });
};
