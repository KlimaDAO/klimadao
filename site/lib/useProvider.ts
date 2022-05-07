import { useRef, useState, useEffect } from "react";
import { urls } from "@klimadao/lib/constants";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";

type EIP1139Provider = ethers.providers.ExternalProvider & {
  on: (e: "accountsChanged" | "chainChanged", cb: () => void) => void;
  remove: (e: "accountsChanged" | "chainChanged", cb: () => void) => void;
};

const useWeb3Modal = () => {
  const ref = useRef<Web3Modal>();
  useEffect(() => {
    const modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            rpc: { 137: urls.polygonMainnetRpc },
          },
        },
        walletlink: {
          package: WalletLink,
          options: {
            appName: "Official KlimaDAO App",
            rpc: urls.polygonMainnetRpc,
            chainId: 137, // Optional. It defaults to 1 if not provided
            appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
            darkMode: false, // Optional. Use dark theme, defaults to false
          },
        },
      },
    });
    ref.current = modal;
  }, []);
  return ref.current;
};

type useProviderTypes = {
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;
  address: string | undefined;
  web3Modal: Web3Modal | undefined;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export const useProvider = (): useProviderTypes => {
  const fallbackProvider = useRef<ethers.providers.JsonRpcProvider>();
  const web3Modal = useWeb3Modal();
  const [address, setAddress] = useState<string>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  const loadWeb3Modal = async () => {
    try {
      const modalProvider = await web3Modal?.connect();
      if (modalProvider) {
        const provider = new ethers.providers.Web3Provider(modalProvider);
        const address = await provider.getSigner().getAddress();
        setProvider(provider);
        setAddress(address);
      }
    } catch (e) {
      console.log(e)
      // handle bug where old cached providers cause the modal to keep reappearing
      web3Modal?.clearCachedProvider();
    }
  };

  const disconnect = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const untypedProvider = provider as any;
    if (
      untypedProvider?.provider &&
      typeof untypedProvider.provider.disconnect === "function"
    ) {
      await untypedProvider.provider.disconnect();
    }

    if (untypedProvider && typeof untypedProvider.disconnect === "function") {
      await untypedProvider.disconnect();
    }

    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      loadWeb3Modal();
    }
  }, [web3Modal]);

  useEffect(() => {
    const handleChainChanged = () => window.location.reload();
    const handleAccountsChanged = () => window.location.reload();

    if (provider && provider.provider) {
      const typedProvider = provider.provider as EIP1139Provider;
      // EIP-1193 Providers (metamask) have these methods
      typedProvider.on("chainChanged", handleChainChanged);
      typedProvider.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      const typedProvider = provider?.provider as EIP1139Provider;
      if (typedProvider && typedProvider.remove) {
        typedProvider.remove("accountsChanged", handleAccountsChanged);
        typedProvider.remove("chainChanged", handleChainChanged);
      }
    };
  }, [provider]);

  if (!provider && !fallbackProvider.current) {
    fallbackProvider.current = new ethers.providers.JsonRpcProvider(
      urls.polygonMainnetRpc
    );

    return {
      provider: fallbackProvider.current,
      address: "",
      web3Modal,
      connect: loadWeb3Modal,
      disconnect,
    };
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    provider: provider || fallbackProvider.current!,
    address,
    web3Modal,
    connect: loadWeb3Modal,
    disconnect,
  };
};
