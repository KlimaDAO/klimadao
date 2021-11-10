import { ethers } from "ethers";

export const getJsonRpcProvider = () => {
  return new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
};
