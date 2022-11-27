import { getDefaultProvider, providers } from "ethers";
import { Domain } from "../../types/domains";
import { getIsValidAddress } from "../getIsValidAddress";
import { getJsonRpcProvider } from "../getJsonRpcProvider";

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

const DEFAULT_ENS_PROFILE =
  "https://raw.githubusercontent.com/ensdomains/media-kit/5ebbcb4e0f4cca1caa1630f30b1116935f5e6636/Logos/Token.svg";

export const getENSProfile = async (params: {
  address: string;
}): Promise<Domain | null> => {
  try {
    const ethProvider = getDefaultProvider(1);
    const ensDomain = await ethProvider.lookupAddress(params.address);
    const imageUrl = ensDomain ? await ethProvider.getAvatar(ensDomain) : null;

    if (ensDomain) {
      return {
        name: ensDomain,
        imageUrl: imageUrl || DEFAULT_ENS_PROFILE,
      };
    }

    return null;
  } catch (error) {
    console.log("getENS error", error);
    return Promise.reject(error);
  }
};
