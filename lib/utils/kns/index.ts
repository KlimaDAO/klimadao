import { ethers } from "ethers";
import { addresses } from "../../constants";
import PunkTLD from "../../abi/PunkTLD.json";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import { getIsValidAddress } from "../getIsValidAddress";

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
