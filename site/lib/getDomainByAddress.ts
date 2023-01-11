import {
  createKNSDomainFromName,
  getENSByAddress,
  getKNSByAddress,
} from "@klimadao/lib/utils";
import { INFURA_ID } from "./secrets";

/** Server-side only util */
export const getDomainByAddress = async (
  address: string
): Promise<string | null> => {
  try {
    const knsName = await getKNSByAddress(address);
    const kns = !!knsName && createKNSDomainFromName(knsName);
    const ens = !kns && (await getENSByAddress(address, INFURA_ID)); // Caution: needs to be InfuraUrl for Ether here
    return kns || ens || null;
  } catch (e) {
    console.error("Error in getDomainByAddress", e);
    return Promise.reject(e);
  }
};
