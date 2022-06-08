import { ethers } from "ethers";
import { urls } from "../../constants";

export const getJsonRpcProvider = (providerUrl?: string) => {
  if (providerUrl) {
    return new ethers.providers.JsonRpcProvider(providerUrl);
  }
  return new ethers.providers.JsonRpcProvider(urls.polygonMainnetRpc);
};
