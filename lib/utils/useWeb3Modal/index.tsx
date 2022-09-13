import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Torus from "@toruslabs/torus-embed";

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
  // BUG: @klimadao/lib transpilation does not properly re-export the Web3Modal or coinbase libraries, probably because we don't use babel in here.
  // Babel automatically adds a default export for interoperability reasons, which is why this isn't a problem in /site and /app (nextjs uses babel)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const untypedWeb3Modal = Web3Modal as any;
  const untypedCoinbase = CoinbaseWalletSDK as any;
  const TypedWeb3Modal = untypedWeb3Modal.default as typeof Web3Modal;
  const TypedCoinbaseWallet =
    untypedCoinbase.default as typeof CoinbaseWalletSDK;
  return new TypedWeb3Modal({
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: { 137: urls.polygonMainnetRpc },
        },
        display: {
          description: strings.walletconnect_desc,
        },
      },
      coinbasewallet: {
        package: TypedCoinbaseWallet, // Required
        options: {
          infuraId: "",
          appName: "KlimaDAO App", // Required
          rpc: urls.polygonMainnetRpc, // Optional if `infuraId` is provided; otherwise it's required
          chainId: 137, // Optional. It defaults to 1 if not provided
          darkMode: false, // Optional. Use dark theme, defaults to false
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
            chainId: 137,
            networkName: "Polygon",
          },
        },
        display: {
          name: strings.torus_name,
          description: strings.torus_desc,
          // Taken from https://mui.com/material-ui/material-icons/?query=email&selected=MailOutline
          logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-10cscxr' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='MailOutlineIcon'%3E%3Cpath stroke-width='.1' stroke='%23999999' fill='%23999999' d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z'%3E%3C/path%3E%3C/svg%3E",
        },
      },
    },
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
    ) as unknown as TypedProvider; // assert for better typings, see event handlers below
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
