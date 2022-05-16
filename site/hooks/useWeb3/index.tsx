import { useEffect, useReducer, useCallback } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { urls } from "@klimadao/lib/constants";
import { ethers } from "ethers";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";

import {
  Web3ProviderState,
  Web3Action,
  web3InitialState,
  web3Reducer,
} from "./reducers";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: { 137: urls.polygonMainnetRpc },
    },
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: "Official KlimaDAO App",
      rpc: urls.polygonMainnetRpc,
      chainId: 137,
      appLogoUrl: null,
      darkMode: false,
    },
  },
};

let web3Modal: Web3Modal | null;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });
}

export const useWeb3State = () => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState);
  const { provider, web3Provider, signer, address, network, isConnected } =
    state;

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();
        const isConnected = Boolean(address);

        dispatch({
          type: "SET_WEB3_PROVIDER",
          provider,
          web3Provider,
          signer,
          address,
          network,
          isConnected,
        } as Web3Action);
      } catch (e) {
        console.log("Connect error:", e);
      }
    } else {
      console.error("No Web3Modal");
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }

      dispatch({ type: "RESET_WEB3_PROVIDER" } as Web3Action);
    } else {
      console.error("No Web3Modal");
    }
  }, [provider]);

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        } as Web3Action);
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== "undefined") {
          console.log("Switched to chain...", _hexChainId);

          window.location.reload();
        } else {
          console.log("Window is undefined");
        }
      };

      const handleDisconnect = () => disconnect();

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  return {
    provider,
    web3Provider,
    signer,
    address,
    network,
    isConnected,
    connect,
    disconnect,
  } as Web3ProviderState;
};
