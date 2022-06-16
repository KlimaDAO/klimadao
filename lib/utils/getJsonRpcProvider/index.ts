import { providers } from "ethers";
import { urls } from "../../constants";

export const getJsonRpcProvider = (providerUrl?: string) => {
  if (providerUrl) {
    return new providers.JsonRpcProvider(providerUrl);
  }
  return new providers.JsonRpcProvider(urls.polygonMainnetRpc);
};
