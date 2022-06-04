import { useEffect, useReducer, useRef, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Torus from "@toruslabs/torus-embed";

import { urls } from "../../constants";
import {
  web3InitialState,
  ConnectedWeb3State,
  Web3ModalState,
  Web3State,
  Web3Action,
  Web3ModalStrings,
} from "../../components/Web3Context/types";

const web3Reducer = (state: Web3State, action: Web3Action): Web3State => {
  switch (action.type) {
    case "CONNECT":
      return {
        ...state,
        ...action.payload,
      };
    case "DISCONNECT":
      return web3InitialState;
    case "SET_ADDRESS":
      if (!state.isConnected) return web3InitialState; // type-guard
      return {
        ...state,
        address: action.payload,
      };
    case "SET_NETWORK":
      if (!state.isConnected) return web3InitialState; // type-guard
      return {
        ...state,
        network: action.payload,
      };
    default:
      throw new Error();
  }
};

/** NOTE: only invoke client-side */
const createWeb3Modal = (strings: Web3ModalStrings): Web3Modal => {
  // BUG: Something about our @klimadao/lib transpilation does not properly export the Web3Modal library.
  // Probably because it doesn't use babel, only typescript.
  // Babel automatically adds a default export for interoperability reasons, which is why this isn't a problem in /site and /app (nextjs uses babel)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const untypedImport = Web3Modal as any;
  const TypedWeb3Modal = untypedImport.default as typeof Web3Modal;

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
  const [web3state, dispatch] = useReducer(web3Reducer, web3InitialState);
  const web3Modal = useLocalizedModal(strings);

  const disconnect = async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      dispatch({ type: "DISCONNECT" });
    } else {
      console.error("No Web3Modal");
    }
  };

  const connect = async () => {
    if (!web3Modal) return;
    const wrappedProvider = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(wrappedProvider);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    const payload: ConnectedWeb3State = {
      provider,
      signer,
      address,
      network,
      isConnected: true,
    };
    dispatch({
      type: "CONNECT",
      payload,
    });
  };

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      console.log("auto connect");
      connect();
    }
  }, []);

  // EIP-1193 events
  useEffect(() => {
    if (web3state.provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        dispatch({
          type: "SET_ADDRESS",
          payload: accounts[0],
        });
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

      web3state.provider.on("accountsChanged", handleAccountsChanged);
      web3state.provider.on("chainChanged", handleChainChanged);
      web3state.provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (web3state.provider.removeListener) {
          web3state.provider.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          web3state.provider.removeListener("chainChanged", handleChainChanged);
          web3state.provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [web3state.provider]);

  return {
    ...web3state,
    connect,
    disconnect,
  };
};
