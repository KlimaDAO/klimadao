import {
  getAddressByENS,
  getAddressByKNS,
  isENSDomain,
  isKNSDomain,
} from "@klimadao/lib/utils";
import { utils } from "ethers";

export const getAddressByDomain = async (domain: string): Promise<string> => {
  try {
    const kns = isKNSDomain(domain) && (await getAddressByKNS(domain));
    const ens =
      isENSDomain(domain) &&
      (await getAddressByENS(domain, getInfuraUrlEther())); // Caution: needs to be InfuraUrl for Ether here
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
