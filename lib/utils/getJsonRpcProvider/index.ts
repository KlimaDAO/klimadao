import { INFURA_ID } from "@klimadao/site/lib/constants";
import { ethers } from "ethers";
import { urls } from "../../constants";

export const getJsonRpcProvider = (provider: string) => {
  if (provider === urls.infuraRpc && INFURA_ID !== undefined) {
    return new ethers.providers.JsonRpcProvider(
      `https://polygon-mainnet.infura.io/v3/${INFURA_ID}`
    );
  }
  return new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
};
