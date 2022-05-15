import { ethers } from "ethers";
import { urls } from "../../constants";

export const getJsonRpcProvider = (infuraId?: string) => {
  if (infuraId) {
    return new ethers.providers.JsonRpcProvider(`${urls.infuraRpc}${infuraId}`);
  }
  return new ethers.providers.JsonRpcProvider(urls.polygonMainnetRpc);
};
