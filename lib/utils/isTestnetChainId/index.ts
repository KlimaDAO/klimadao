import { polygonNetworks } from "../../constants";

export const isTestnetChainId = (chainId?: number | null) => {
  return polygonNetworks["testnet"].chainId === chainId;
};
