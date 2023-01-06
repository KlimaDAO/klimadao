import {
  getAddressByENS,
  getAddressByKNS,
  getInfuraUrl,
  isENSDomain,
  isKNSDomain,
} from "@klimadao/lib/utils";
import { utils } from "ethers";

export const getAddressByDomain = async (domain: string): Promise<string> => {
  try {
    const kns = isKNSDomain(domain) && (await getAddressByKNS(domain));
    const ens =
      isENSDomain(domain) &&
      (await getAddressByENS(
        domain,
        getInfuraUrl({
          chain: "eth",
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID as string,
        })
      )); // Caution: needs to be InfuraUrl for Ether here
    const address = kns || ens;

    if (!address || !utils.isAddress(address)) {
      throw new Error("Not a valid address");
    }
    return address.toLowerCase();
  } catch (e) {
    console.error("Error in getAddressByDomain", e);
    return Promise.reject(e);
  }
};
