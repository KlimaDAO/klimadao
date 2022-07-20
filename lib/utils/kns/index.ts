import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { getIsValidAddress } from "../getIsValidAddress";
import { getContract } from "../getContract";
import { Domain } from "../../types/domains";

// https://www.kns.earth/#/
export const isKNSDomain = (domain: string): boolean =>
  !!domain && domain.toLowerCase().includes(".klima");

export const createKNSDomainFromName = (name: string): string =>
  `${name}.klima`;

// Use this import and overwrite your provider if needed with
// import { KNSContract } from '...'
// KNSContract.provider = myProvider;
export const KNSContract = getContract({
  contractName: "klimaNameService",
  provider: getJsonRpcProvider(),
});

export const getAddressByKNS = async (domain: string): Promise<string> => {
  try {
    const strippedDomain = domain.replace(".klima", "");
    const address = await KNSContract.getDomainHolder(strippedDomain);
    if (!getIsValidAddress(address)) {
      throw new Error("Not a valid KNS address");
    }
    return address;
  } catch (e) {
    console.error("Error in getAddressByKNS", e);
    return Promise.reject(e);
  }
};

export const getKNSByAddress = async (
  address: string
): Promise<string | null> => {
  try {
    const domain = await KNSContract.defaultNames(address); // name without .klima
    return domain;
  } catch (e) {
    console.error("Error in getKNSByAddress", e);
    return Promise.reject(e);
  }
};

// Resolves kns domain for profile image
export const getKNSProfile = async (params: {
  address: string;
  providerUrl?: string;
}): Promise<Domain | null> => {
  const provider = getJsonRpcProvider(params.providerUrl);
  const KNSContract = getContract({
    contractName: "klimaNameService",
    provider,
  });

  try {
    const domainName = await KNSContract.defaultNames(params.address);
    if (!domainName) return null;

    const domainData = await KNSContract.getDomainData(domainName);
    const parsedDomainData = domainData ? JSON.parse(domainData) : null;

    if (parsedDomainData && parsedDomainData.imgAddress) {
      return {
        name: `${domainName}.klima`,
        imageUrl: parsedDomainData.imgAddress,
      };
    }

    return await getDefaultKNSProfile(domainName);
  } catch (error) {
    console.log("Error in getKNSProfile", error);
    return Promise.reject(error);
  }
};

export interface DefaultDomainData {
  name: string;
  description: string;
  image: string;
}

const getDefaultKNSProfile = async (domainName: string) => {
  const domainStruct = await KNSContract.domains(domainName);
  const tokenURI: string = await KNSContract.tokenURI(domainStruct.tokenId);
  const defaultDomainData: DefaultDomainData = await (
    await fetch(tokenURI)
  ).json();

  return {
    name: `${domainName}.klima`,
    imageUrl: defaultDomainData.image,
  };
};
