import { Domain } from "../../types/domains";
import { getContract } from "../getContract";
import { getStaticProvider } from "../getStaticProvider";

// Use this import and overwrite your provider if needed with
// import { KNSContract } from '...'
// KNSContract.provider = myProvider;
const KNSContract = getContract({
  contractName: "klimaNameService",
  provider: getStaticProvider(),
});

// Resolves kns domain for profile image
export const getKNSProfile = async (params: {
  address: string;
  infuraId?: string;
}): Promise<Domain | null> => {
  const provider = getStaticProvider({ infuraId: params.infuraId });
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
    console.error("Error in getKNSProfile", error);
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
