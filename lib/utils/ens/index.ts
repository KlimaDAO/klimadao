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
