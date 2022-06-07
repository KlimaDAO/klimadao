import { ethers } from "ethers";
import { addresses } from "../../constants";
import PunkTLD from "../../abi/PunkTLD.json";
import { getJsonRpcProvider } from "../getJsonRpcProvider";

// https://www.kns.earth/#/
export const isKNSDomain = (domain: string): boolean =>
  !!domain && domain.toLowerCase().includes(".klima");

// Use this import and overwrite your provider if needed with
// import { KNSContract } from '...'
// KNSContract.provider = myProvider;
export const KNSContract = new ethers.Contract(
  addresses["mainnet"].klimaNameService,
  PunkTLD.abi,
  getJsonRpcProvider()
);

// contract method getDomainHolder returns this address on not found
const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

const isValidAddress = (address: string) =>
  !!address && address !== EMPTY_ADDRESS;

export const getAddressByKNS = async (
  domain: string
): Promise<string | null> => {
  try {
    const strippedDomain = domain.replace(".klima", "");
    const address = await KNSContract.getDomainHolder(strippedDomain);
    return isValidAddress(address) ? address : null;
  } catch (e) {
    console.error("Error in getAddressByKNS", e);
    return Promise.reject(e);
  }
};
