import { URLS } from "./urls.constants";

export const NETWORKS = {
  polygon: {
    testnet: {
      chainName: "Polygon Testnet Mumbai",
      hexChainId: "0x13881",
      chainId: 80001,
      rpcUrls: [URLS.polygonTestnetRpc],
      blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    },
    mainnet: {
      chainName: "Polygon Mainnet",
      hexChainId: "0x89",
      chainId: 137,
      rpcUrls: [URLS.polygonMainnetRpc],
      blockExplorerUrls: ["https://polygonscan.com"],
    },
  },
};
