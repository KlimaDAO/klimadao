import { getStaticProvider as IGetStaticProvider } from "@klimadao/lib/utils";
import { providers } from "ethers";
import { config } from "lib/constants";

/** Get a static provider based on the given `chain` parameter, fallback to config.defaultNetwork */
export const getStaticProvider = (
  params?: Parameters<typeof IGetStaticProvider>[0]
): providers.JsonRpcProvider => {
  const chain =
    params?.chain ?? config.defaultNetwork === "testnet" ? "mumbai" : "polygon";
  return IGetStaticProvider({ ...params, chain });
};
