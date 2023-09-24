import {
  getAddressByENS,
  getAddressByKNS,
  isENSDomain,
  isKNSDomain,
} from "@klimadao/lib/utils";
import { isAddress } from "ethers-v6";
import { INFURA_ID } from "./secrets";

/** Server-side only util */
export const getAddressByDomain = async (domain: string): Promise<string> => {
  try {
    const kns = isKNSDomain(domain) && (await getAddressByKNS(domain));
    const ens =
      isENSDomain(domain) && (await getAddressByENS(domain, INFURA_ID));
    const address = kns || ens;

    if (!address || !isAddress(address)) {
      throw new Error("Not a valid address");
    }
    return address.toLowerCase();
  } catch (e) {
    console.error("Error in getAddressByDomain", e);
    return Promise.reject(e);
  }
};
