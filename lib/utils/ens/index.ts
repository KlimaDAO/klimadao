import { getDefaultProvider } from "@ethersproject/providers";

export const isENSDomain = (domain: string) =>
  !!domain && domain.includes(".eth");

export const ETHProvider = getDefaultProvider();

export const getAddressByENS = async (domain: string) => {
  try {
    const address = await ETHProvider.resolveName(domain);
    return address;
  } catch (e) {
    console.log("Error in getAddressByENS", e);
    return Promise.reject(e);
  }
};
