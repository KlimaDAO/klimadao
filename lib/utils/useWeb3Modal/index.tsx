import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import Web3Modal from "web3modal";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
// import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { urls } from "../../constants";
import {
  web3InitialState,
  ConnectedWeb3State,
  Web3ModalState,
  // Web3ModalStrings,
  Web3State,
  // TypedProvider,
} from "../../components/Web3Context/types";

/** NOTE: only invoke client-side */
// const createWeb3Modal = (strings: Web3ModalStrings): Web3Modal => {
//   // BUG: @klimadao/lib transpilation does not properly re-export the Web3Modal or coinbase libraries, probably because we don't use babel in here.
//   // Babel automatically adds a default export for interoperability reasons, which is why this isn't a problem in /site and /app (nextjs uses babel)
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const untypedWeb3Modal = Web3Modal as any;
//   const untypedCoinbase = CoinbaseWalletSDK as any;
//   const TypedWeb3Modal = untypedWeb3Modal.default as typeof Web3Modal;
//   const TypedCoinbaseWallet =
//     untypedCoinbase.default as typeof CoinbaseWalletSDK;
//   return new TypedWeb3Modal({
//     cacheProvider: true,
//     providerOptions: {
//       walletconnect: {
//         package: WalletConnectProvider, // required
//         options: {
//           rpc: { 137: urls.polygonMainnetRpc },
//         },
//         display: {
//           description: strings.walletconnect_desc,
//         },
//       },
//       coinbasewallet: {
//         package: TypedCoinbaseWallet, // Required
//         options: {
//           appName: "KlimaDAO App", // Required
//           rpc: urls.polygonMainnetRpc, // Optional if `infuraId` is provided; otherwise it's required
//           chainId: 137, // Optional. It defaults to 1 if not provided
//           darkMode: false, // Optional. Use dark theme, defaults to false
//         },
//       },
//       injected: {
//         display: {
//           description: strings.injected_desc,
//         },
//         package: null,
//       },
//       torus: {
//         package: Torus,
//         options: {
//           networkParams: {
//             host: "matic", // optional
//             chainId: 137,
//             networkName: "Polygon",
//           },
//           config: {
//             buildEnv: "production",
//             showTorusButton: false,
//           },
//         },
//         display: {
//           name: strings.torus_name,
//           description: strings.torus_desc,
//           // Taken from https://mui.com/material-ui/material-icons/?query=email&selected=MailOutline
//           logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-10cscxr' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='MailOutlineIcon'%3E%3Cpath stroke-width='.1' stroke='%23999999' fill='%23999999' d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z'%3E%3C/path%3E%3C/svg%3E",
//         },
//       },
//     },
//   });
// };

/**
 * Compare strings to see if locale changed, then instantiate a new modal if needed.
 */
// const useLocalizedModal = (
//   strings: Web3ModalStrings
// ): Web3Modal | undefined => {
//   const modalRef = useRef<Web3Modal>();
//   const [prevStrings, setPrevStrings] = useState<Web3ModalStrings>(strings);

//   useEffect(() => {
//     if (strings.torus_name !== prevStrings.torus_name) {
//       modalRef.current = createWeb3Modal(strings);
//       setPrevStrings(strings);
//     }
//   }, [strings]);

//   if (typeof window === "undefined") {
//     return;
//   }
//   if (!modalRef.current) {
//     modalRef.current = createWeb3Modal(strings);
//   }
//   return modalRef.current;
// };

/** React Hook to create and manage the web3Modal lifecycle */
export const useWeb3Modal = (): Web3ModalState => {
  const [web3state, setWeb3State] = useState<Web3State>(web3InitialState);
  // const web3Modal = useLocalizedModal(strings);

  const disconnect = async () => {
    // if (web3Modal?.cachedProvider) {
    //   web3Modal.clearCachedProvider();
    // }
    // setWeb3State(web3InitialState);
    if (web3state && (web3state.provider?.provider as any)?.isTorus === true) {
      await (web3state.provider?.provider as any).torus.cleanUp();
      // triggers reload via accountsChanged
    } else {
      window.location.reload();
    }
  };

  const connect = async (wallet?: string): Promise<void> => {
    if (window.ethereum && wallet === "metamask") {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any,
        137
      ) as any;
      // await provider.enable();
      await provider.send("eth_requestAccounts", []);
      console.log(provider);
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
      console.log("newState", newState);
    } else if (wallet === "coinbase") {
      const coinbaseWallet = new CoinbaseWalletSDK({
        appName: "KlimaDAO App",
        darkMode: false,
      });

      const provider = new ethers.providers.Web3Provider(
        coinbaseWallet.makeWeb3Provider(urls.polygonMainnetRpc, 137) as any
      ) as any;
      console.log(provider);

      await provider.enable();
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.provider.getNetwork();
      const newState: ConnectedWeb3State = {
        provider,
        signer,
        address,
        network,
        isConnected: true,
      };
      setWeb3State(newState);
      console.log("newState", newState);
    } else if (wallet === "walletConnect") {
      const walletConnect = new WalletConnectProvider({
        rpc: { 137: urls.polygonMainnetRpc },
      });
      const provider = new ethers.providers.Web3Provider(walletConnect)
        .provider as any;
      console.log("wallet connect provider", provider);

      await provider.enable();
      console.log("enabled");
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.provider.getNetwork();
      const newState: ConnectedWeb3State = {
        provider,
        signer,
        address,
        network,
        isConnected: true,
      };
      setWeb3State(newState);
      console.log("newState", newState);
    } else return;

    // const wrappedProvider = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(
    //   wrappedProvider
    // ) as unknown as TypedProvider; // assert for better typings, see event handlers below
  };

  // Auto connect to the cached provider if its metamask
  useEffect(() => {
    if (window.ethereum) {
      connect();
    }
  }, []);

  // EIP-1193 events
  useEffect(() => {
    if (!web3state.provider) return;
    const handleDisconnect = () => {
      // when force-disconnecting via metamask ui, prevent an infinite reconnect loop
      // web3Modal?.clearCachedProvider();
      window.location.reload();
    };
    const handleAccountsChanged = () => {
      window.location.reload();
    };

    /** There is a bug where ethers doesn't respond to web3modal events for these two, so we use the nested provider
     * https://github.com/ethers-io/ethers.js/issues/2988 */
    web3state.provider.provider.on("accountsChanged", handleAccountsChanged);
    web3state.provider.on("disconnect", handleDisconnect);

    return () => {
      web3state.provider.provider.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
      web3state.provider.removeListener("disconnect", handleDisconnect);
    };
  }, [web3state.provider]);

  return {
    ...web3state,
    connect,
    disconnect,
  };
};
