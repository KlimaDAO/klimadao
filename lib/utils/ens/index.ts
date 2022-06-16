import { providers } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { getIsValidAddress } from "../getIsValidAddress";

export const isENSDomain = (domain: string) =>
  !!domain && domain.includes(".eth");

export const getAddressByENS = async (domain: string, providerUrl?: string) => {
  try {
    const provider = getJsonRpcProvider(providerUrl);
    const address = await provider.resolveName(domain);
    if (!address || !getIsValidAddress(address)) {
      throw new Error("Not a valid ENS address");
    }
    return address;
  } catch (e) {
    console.error("Error in getAddressByENS", e);
    return Promise.reject(e);
  }
};

export const getENSByAddress = async (
  address: string,
  providerUrl?: string
): Promise<string | null> => {
  try {
    // ENS lookup on the serverside works only with providerUrl
    // fallback to getDefaultProvider on local development where secrets are not present
    const provider = providerUrl
      ? getJsonRpcProvider(providerUrl)
      : providers.getDefaultProvider(1);
    const domain = await provider.lookupAddress(address);
    return domain;
  } catch (e) {
    console.error("Error in getENSByAddress", e);
    return Promise.reject(e);
  }
};
