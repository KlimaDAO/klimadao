import {
  getKNSByAddress,
  createKNSDomainFromName,
  getENSByAddress,
} from "@klimadao/lib/utils";
import { getInfuraUrlEther } from "lib/getInfuraUrl";

export const getDomainByAddress = async (
  address: string
): Promise<string | null> => {
  try {
    const knsName = await getKNSByAddress(address);
    const kns = !!knsName && createKNSDomainFromName(knsName);
    // ENS lookup on the serverside works only with providerUrl
    const ens = !kns && (await getENSByAddress(address, getInfuraUrlEther())); // Caution: needs to be InfuraUrl for Ether here
    return kns || ens || null;
  } catch (e) {
    console.error("Error in getDomainByAddress", e);
    return Promise.reject(e);
  }
};
