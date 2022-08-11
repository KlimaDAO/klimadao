import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import Web3Modal, { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Torus from "@toruslabs/torus-embed";
import MetaMaskOnboarding from "@metamask/onboarding";

import { urls } from "../../constants";
import {
  web3InitialState,
  ConnectedWeb3State,
  Web3ModalState,
  Web3ModalStrings,
  Web3State,
  TypedProvider,
} from "../../components/Web3Context/types";

/** NOTE: only invoke client-side */
const createWeb3Modal = (strings: Web3ModalStrings): Web3Modal => {
  // BUG: @klimadao/lib transpilation does not properly re-export the Web3Modal library, probably because we don't use babel in here.
  // Babel automatically adds a default export for interoperability reasons, which is why this isn't a problem in /site and /app (nextjs uses babel)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const untypedImport = Web3Modal as any;
  const TypedWeb3Modal = untypedImport.default as typeof Web3Modal;
  const providerOptions: IProviderOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        rpc: { 137: urls.polygonMainnetRpc },
      },
      display: {
        description: strings.walletconnect_desc,
      },
    },
    walletlink: {
      package: WalletLink,
      options: {
        appName: "KlimaDAO App",
        rpc: urls.polygonMainnetRpc,
        chainId: 137, // Optional. It defaults to 1 if not provided
        appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
        darkMode: false, // Optional. Use dark theme, defaults to false
      },
      display: {
        description: strings.coinbase_desc,
      },
    },
    injected: {
      display: {
        description: strings.injected_desc,
      },
      package: null,
    },
    torus: {
      package: Torus,
      options: {
        networkParams: {
          host: "matic", // optional
        },
      },
      display: {
        name: strings.torus_name,
        description: strings.torus_desc,
        // Taken from https://mui.com/material-ui/material-icons/?query=email&selected=MailOutline
        logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-10cscxr' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='MailOutlineIcon'%3E%3Cpath stroke-width='.1' stroke='%23999999' fill='%23999999' d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z'%3E%3C/path%3E%3C/svg%3E",
      },
    },
  };

  if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
    providerOptions["custom-metamaskonboardprovider"] = {
      display: {
        logo: "data:image/gif;base64,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",
        name: "Metamask onboarding",
        description: "Install metamask",
      },
      package: MetaMaskOnboarding,
      connector: async (Provider: typeof MetaMaskOnboarding) => {
        const onboarding = new Provider();
        onboarding.startOnboarding();
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return new Promise(() => {});
      },
    };
  }
  return new TypedWeb3Modal({
    cacheProvider: true,
    providerOptions,
  });
};

/**
 * Compare strings to see if locale changed, then instantiate a new modal if needed.
 */
const useLocalizedModal = (
  strings: Web3ModalStrings
): Web3Modal | undefined => {
  const modalRef = useRef<Web3Modal>();
  const [prevStrings, setPrevStrings] = useState<Web3ModalStrings>(strings);

  useEffect(() => {
    if (strings.torus_name !== prevStrings.torus_name) {
      modalRef.current = createWeb3Modal(strings);
      setPrevStrings(strings);
    }
  }, [strings]);

  if (typeof window === "undefined") {
    return;
  }
  if (!modalRef.current) {
    modalRef.current = createWeb3Modal(strings);
  }
  return modalRef.current;
};

/** React Hook to create and manage the web3Modal lifecycle */
export const useWeb3Modal = (strings: Web3ModalStrings): Web3ModalState => {
  const [web3state, setWeb3State] = useState<Web3State>(web3InitialState);
  const web3Modal = useLocalizedModal(strings);

  const disconnect = async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      setWeb3State(web3InitialState);
      window.location.reload();
    }
  };

  const connect = async () => {
    if (!web3Modal) return;
    const wrappedProvider = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(
      wrappedProvider
    ) as TypedProvider; // assert for better typings, see event handlers below
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    const newState: ConnectedWeb3State = {
      provider,
      signer,
      address,
      network,
      isConnected: true,
    };
    setWeb3State(newState);
  };

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, []);

  // EIP-1193 events
  useEffect(() => {
    if (!web3state.provider) return;
    // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
    const handleDisconnect = () => disconnect();
    const handleReload = () => window.location.reload();

    /** There is a bug where ethers doesn't respond to web3modal events for these two, so we use the nested provider
     * https://github.com/ethers-io/ethers.js/issues/2988 */
    web3state.provider.provider.on("accountsChanged", handleReload);
    web3state.provider.provider.on("chainChanged", handleReload);
    web3state.provider.on("disconnect", handleDisconnect);

    return () => {
      web3state.provider.provider.removeListener(
        "accountsChanged",
        handleReload
      );
      web3state.provider.provider.removeListener("chainChanged", handleReload);
      web3state.provider.removeListener("disconnect", handleDisconnect);
    };
  }, [web3state.provider]);

  return {
    ...web3state,
    connect,
    disconnect,
  };
};
