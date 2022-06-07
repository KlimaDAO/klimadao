import {
  isKNSDomain,
  getAddressByKNS,
  isENSDomain,
  getAddressByENS,
} from "@klimadao/lib/utils";

export const getAddressByDomain = async (
  domain: string
): Promise<string | null> => {
  try {
    let address;
    if (isKNSDomain(domain)) {
      address = await getAddressByKNS(domain);
    } else if (isENSDomain(domain)) {
      address = await getAddressByENS(domain);
    } else {
      address = null;
    }
    return address;
  } catch (e) {
    console.error("Error in getAddressByDomain", e);
    return Promise.reject(e);
  }
};
