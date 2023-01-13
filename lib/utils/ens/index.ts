import { Domain } from "../../types/domains";
import { getIsValidAddress } from "../getIsValidAddress";
import { getStaticProvider } from "../getStaticProvider";

export const isENSDomain = (domain: string) =>
  !!domain && domain.includes(".eth");

export const getAddressByENS = async (domain: string, infuraId?: string) => {
  try {
    const provider = getStaticProvider({ infuraId, chain: "eth" });
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
  infuraId?: string
): Promise<string | null> => {
  try {
    const provider = getStaticProvider({
      chain: "eth",
      infuraId,
    });
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
  infuraId?: string;
}): Promise<Domain | null> => {
  try {
    const provider = getStaticProvider({
      chain: "eth",
      infuraId: params.infuraId,
    });
    const ensDomain = await provider.lookupAddress(params.address);
    const imageUrl = ensDomain ? await provider.getAvatar(ensDomain) : null;

    if (ensDomain) {
      return {
        name: ensDomain,
        imageUrl: imageUrl || DEFAULT_ENS_PROFILE,
      };
    }

    return null;
  } catch (error) {
    console.error("getENS error", error);
    return Promise.reject(error);
  }
};
