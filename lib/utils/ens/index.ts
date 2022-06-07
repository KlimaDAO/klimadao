import { getDefaultProvider } from "@ethersproject/providers";
import { getIsValidAddress } from "../getIsValidAddress";

export const isENSDomain = (domain: string) =>
  !!domain && domain.includes(".eth");

export const ETHProvider = getDefaultProvider();

export const getAddressByENS = async (domain: string) => {
  try {
    const address = await ETHProvider.resolveName(domain);
    if (!address || !getIsValidAddress(address)) {
      throw new Error("Not a valid ENS address");
    }
    return address;
  } catch (e) {
    console.error("Error in getAddressByENS", e);
    return Promise.reject(e);
  }
};
