import { ethers } from "ethers";
import { urls } from "../../constants";

export const getJsonRpcProvider = (
  providerUrl?: string,
  network: "eth" | "matic" = "matic"
) => {
  if (providerUrl) {
    return new ethers.providers.JsonRpcProvider(providerUrl);
  }

  if (network === "eth") return ethers.providers.getDefaultProvider(1);

  return new ethers.providers.JsonRpcProvider(urls.polygonMainnetRpc);
};
