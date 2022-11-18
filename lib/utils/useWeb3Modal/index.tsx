import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { urls } from "../../constants";
import {
  web3InitialState,
  ConnectedWeb3State,
  Web3ModalState,
  Web3State,
  // TypedProvider,
} from "../../components/Web3Context/types";

/** React Hook to create and manage the web3Modal lifecycle */
export const useWeb3Modal = (): Web3ModalState => {
  const [web3state, setWeb3State] = useState<Web3State>(web3InitialState);
  // const web3Modal = useLocalizedModal(strings);

  const disconnect = async () => {
    setWeb3State(web3InitialState);
    if (web3state && (web3state.provider?.provider as any)?.isTorus === true) {
      await (web3state.provider?.provider as any).torus.cleanUp();
      // triggers reload via accountsChanged
    } else {
      window.location.reload();
    }
  };

  const connect = async (wallet?: string): Promise<void> => {
    try {
      if (wallet === "metamask" || wallet === "brave" || window.ethereum) {
        console.log(window.ethereum);
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any,
          137
        ) as any;
        await provider.send("eth_requestAccounts", []);
        console.log("mm provider", provider);
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
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
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
      } else if (wallet === "walletConnect") {
        const walletConnectProvider = new WalletConnectProvider({
          rpc: { 137: urls.polygonMainnetRpc },
        });
        await walletConnectProvider.enable();
        const provider = new ethers.providers.Web3Provider(
          walletConnectProvider
        ) as any;
        const signer = await provider.getSigner();
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
      } else if (wallet === "torus") {
        const torus = new Torus();
        await torus.init({
          network: {
            host: "matic",
            chainId: 137,
            networkName: "Polygon",
          },
        });
        await torus.login();
        const provider = new ethers.providers.Web3Provider(
          torus.provider
        ) as any;
        const signer = await provider.getSigner();
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
      } else {
        console.log("else here");
      }
    } catch (e: any) {
      console.log("error connecting:", e);
      return e;
    }
  };

  // Auto connect to the cached provider if its metamask
  // brave injects window.ethereum as well
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
