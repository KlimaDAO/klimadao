import { useEffect, useReducer, useRef, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Torus from "@toruslabs/torus-embed";
import { urls } from "../../constants";

import {
  web3InitialState,
  Web3ProviderState,
} from "../../components/Web3Context";

type Web3Action =
  | {
      type: "SET_WEB3_PROVIDER";
      provider: Web3ProviderState["provider"];
      web3Provider: Web3ProviderState["web3Provider"];
      signer: Web3ProviderState["signer"];
      address: Web3ProviderState["address"];
      network: Web3ProviderState["network"];
      isConnected: Web3ProviderState["isConnected"];
    }
  | {
      type: "SET_ADDRESS";
      address: Web3ProviderState["address"];
    }
  | {
      type: "SET_NETWORK";
      network: Web3ProviderState["network"];
    }
  | {
      type: "RESET_WEB3_PROVIDER";
    };

function web3Reducer(
  state: Web3ProviderState,
  action: Web3Action
): Web3ProviderState {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        signer: action.signer,
        address: action.address,
        network: action.network,
        isConnected: action.isConnected,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_NETWORK":
      return {
        ...state,
        network: action.network,
      };
    case "RESET_WEB3_PROVIDER":
      return web3InitialState;
    default:
      throw new Error();
  }
}

export interface Web3ModalStrings {
  walletconnect_desc: string;
  coinbase_desc: string;
  injected_desc: string;
  torus_name: string;
  torus_desc: string;
}

/** NOTE: only invoke client-side */
const createWeb3Modal = (strings: Web3ModalStrings) => {
  if (typeof window === "undefined") return;
  return new Web3Modal({
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
export const useWeb3Modal = (strings: Web3ModalStrings) => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState);
  const web3Modal = useLocalizedModal(strings);
  const { provider, web3Provider, signer, address, network, isConnected } =
    state;

  const connect = async () => {
    if (!web3Modal) return;
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
  };

  const disconnect = async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }

      dispatch({ type: "RESET_WEB3_PROVIDER" } as Web3Action);
    } else {
      console.error("No Web3Modal");
    }
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
  }, [provider]);

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
