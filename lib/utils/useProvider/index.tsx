import { providers } from "ethers";
import { useEffect, useState } from "react";
import {
  CoinbaseProvider,
  ConnectedWeb3State,
  TorusProvider,
  TypedProvider,
  WalletConnectProvider,
  web3InitialState,
  Web3ModalState,
  Web3State,
  WrappedProvider,
} from "../../components/Web3Context/types";
import { urls } from "../../constants";

/** Type guards for convenience and readability */
const isTorusProvider = (p?: WrappedProvider): p is TorusProvider =>
  !!p && "isTorus" in p && p.isTorus;

const isWalletConnectProvider = (
  p?: WrappedProvider
): p is WalletConnectProvider =>
  !!p && "isWalletConnect" in p && p.isWalletConnect;

const isCoinbaseProvider = (p?: WrappedProvider): p is CoinbaseProvider =>
  !!p && "isCoinbaseWallet" in p && p.isCoinbaseWallet;

const getWeb3Provider = (p: any): TypedProvider => {
  return new providers.Web3Provider(p) as TypedProvider;
};

/** React Hook to create and manage the web3Modal lifecycle */
export const useProvider = (): Web3ModalState => {
  const [web3state, setWeb3State] = useState<Web3State>(web3InitialState);

  const disconnect = async () => {
    localStorage.removeItem("web3-wallet");
    if (isTorusProvider(web3state.provider?.provider)) {
      await web3state.provider?.provider?.torus?.cleanUp();
    } else if (
      isWalletConnectProvider(web3state.provider?.provider) ||
      isCoinbaseProvider(web3state.provider?.provider)
    ) {
      await web3state.provider?.provider?.close();
    }
    window.location.reload();
  };

  const connect = async (wallet?: string): Promise<void> => {
    const connectedWallet = localStorage.getItem("web3-wallet");
    try {
      let provider: TypedProvider;

      /** HANDLE METAMASK / INJECTED */
      if (
        (wallet === "injected" || connectedWallet === "injected") &&
        window &&
        window.ethereum
      ) {
        provider = getWeb3Provider(window.ethereum);
        // if user is not already connected this request will prompt the wallet modal to open and the user to connect
        await provider.send("eth_requestAccounts", []);
        localStorage.setItem("web3-wallet", "injected");
      } else if (wallet === "coinbase" || connectedWallet === "coinbase") {
        const { CoinbaseWalletSDK } = await import("@coinbase/wallet-sdk");
        const coinbaseWallet = new CoinbaseWalletSDK({
          appName: "KlimaDAO",
          darkMode: document.body.dataset.theme === "theme-dark", // TODO: get theme from body/localstorage
        });
        provider = getWeb3Provider(
          coinbaseWallet.makeWeb3Provider(urls.infuraPolygonRpcClient, 137)
        );
        // if user is not already connected this request will prompt the wallet modal to open and the user to connect
        await provider.send("eth_requestAccounts", []);
        localStorage.setItem("web3-wallet", "coinbase");

        /** HANDLE WALLETCONNECT */
      } else if (
        wallet === "walletConnect" ||
        connectedWallet === "walletConnect"
      ) {
        const { default: WalletConnectProvider } = await import(
          "@walletconnect/web3-provider"
        );
        const walletConnectProvider = new WalletConnectProvider({
          rpc: {
            137: urls.infuraPolygonRpcClient,
          },
        });
        await walletConnectProvider.enable();
        provider = getWeb3Provider(walletConnectProvider);
        localStorage.setItem("web3-wallet", "walletConnect");

        /** HANDLE TORUS */
      } else if (wallet === "torus" || connectedWallet === "torus") {
        const { default: Torus } = await import("@toruslabs/torus-embed");
        const torus = new Torus();
        await torus.init({
          network: {
            host: urls.infuraPolygonRpcClient,
            chainId: 137,
            networkName: "Polygon",
          },
          showTorusButton: false,
        });
        await torus.login();
        provider = getWeb3Provider(torus.provider);
        (provider.provider as TorusProvider).torus = torus; // inject so we can access this later (on disconnect)
        localStorage.setItem("web3-wallet", "torus");
      } else {
        throw new Error("Error connecting");
      }

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
    } catch (e: any) {
      if (
        // TODO check message for coinbase when it is working again
        e.code === 4001 ||
        e.message === "User closed modal" ||
        e.message === "User cancelled login"
      ) {
        e.name = "rejected";
      }
      throw e;
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
    if (!web3state.provider || isTorusProvider(web3state.provider.provider)) {
      // no need to listen to torus events. They do not have any external control
      return;
    }
    const handleAccountsChanged = (accts: string[]) => {
      if (accts.length > 0) {
        window.location.reload();
      } else {
        localStorage.removeItem("web3-wallet");
        window.location.reload();
      }
    };
    const handleChainChanged = () => {
      window.location.reload();
    };
    const handleDisconnect = () => {
      localStorage.removeItem("web3-wallet");
      window.location.reload();
    };

    /** There is a bug where ethers doesn't respond to web3modal events for these two, so we use the nested provider
     * https://github.com/ethers-io/ethers.js/issues/2988 */
    web3state.provider.provider.on("accountsChanged", handleAccountsChanged);
    web3state.provider.provider.on("chainChanged", handleChainChanged);
    /** For WalletConnect and Coinbase disconnections */
    web3state.provider.provider.on("disconnect", handleDisconnect);

    return () => {
      web3state.provider.provider.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
      web3state.provider.provider.removeListener(
        "chainChanged",
        handleChainChanged
      );
      web3state.provider.provider.removeListener(
        "disconnect",
        handleDisconnect
      );
    };
  }, [web3state.provider]);

  return {
    ...(web3state as Web3ModalState),
    connect,
    disconnect,
  };
};
