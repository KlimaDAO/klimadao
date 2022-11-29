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
  // TODO make no torus button
  const disconnect = async () => {
    setWeb3State(web3InitialState);
    localStorage.removeItem("web3-wallet");
    if (web3state && (web3state.provider?.provider as any)?.isTorus === true) {
      await (web3state.provider?.provider as any).torus.cleanUp();
      // triggers reload via accountsChanged
    } else {
      window.location.reload();
    }
  };

  const connect = async (wallet?: string): Promise<void> => {
    const connectedWallet = localStorage.getItem("web3-wallet");
    try {
      if (
        wallet === "metamask" ||
        wallet === "brave" ||
        connectedWallet === "injected"
      ) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any,
          137
        ) as any;
        // if user is not already connected this request will prompt the wallet modal to open and the user to connect
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
        localStorage.setItem("web3-wallet", "injected");
      } else if (wallet === "coinbase" || connectedWallet === "coinbase") {
        const coinbaseWallet = new CoinbaseWalletSDK({
          appName: "KlimaDAO App",
          darkMode: false,
        });

        const provider = new ethers.providers.Web3Provider(
          coinbaseWallet.makeWeb3Provider(urls.polygonMainnetRpc, 137) as any
        ) as unknown as TypedProvider;
        // if user is not already connected this request will prompt the wallet modal to open and the user to connect
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
        localStorage.setItem("web3-wallet", "coinbase");
      } else if (
        wallet === "walletConnect" ||
        connectedWallet === "walletConnect"
      ) {
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
        localStorage.setItem("web3-wallet", "walletConnect");
      } else if (wallet === "torus" || connectedWallet === "torus") {
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
        localStorage.setItem("web3-wallet", "torus");
      } else {
        console.log("else here");
      }
    } catch (e: any) {
      console.log("error connecting:", e);
      throw new Error(e);
    }
  };

  // Auto connect to the cached provider if web3-wallet has a value
  useEffect(() => {
    const wallet = localStorage.getItem("web3-wallet");
    if (wallet) {
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
