import { ethers } from "ethers";
import {
  isKNSDomain,
  getAddressByKNS,
  isENSDomain,
  getAddressByENS,
} from "@klimadao/lib/utils";

export const getAddressByDomain = async (domain: string): Promise<string> => {
  try {
    const kns = isKNSDomain(domain) && (await getAddressByKNS(domain));
    const ens = isENSDomain(domain) && (await getAddressByENS(domain));
    const address = kns || ens;

    if (!address || !ethers.utils.isAddress(address)) {
      throw new Error("Not a valid address");
    }
    return address;
  } catch (e) {
    console.error("Error in getAddressByDomain", e);
    return Promise.reject(e);
  }
};
