import { providers } from "ethers";
import { useEffect, useState } from "react";
import {
  CoinbaseProvider,
  ConnectFn,
  ConnectedWeb3State,
  TorusProvider,
  TypedProvider,
  WalletConnectProvider,
  WalletLabel,
  Web3ModalState,
  Web3State,
  WrappedProvider,
  web3InitialState,
} from "../../components/Web3Context/types";
import { polygonNetworks, urls } from "../../constants";
import { isTestnetChainId } from "../isTestnetChainId";

/** Type guards for convenience and readability */
const isTorusProvider = (p?: WrappedProvider): p is TorusProvider =>
  !!p && "isTorus" in p && (p as any).isTorus === true;

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
export const useProvider = (
  walletConnectProjectId?: string
): Web3ModalState => {
  // TODO - fix types here - base build breaking with Type error: This expression is not callable.
  const [web3state, setWeb3State] = useState<Web3State | any>(web3InitialState);

  const disconnect = async () => {
    localStorage.removeItem("web3-wallet");
    if (isTorusProvider(web3state.provider?.provider)) {
      await web3state.provider?.provider?.torus?.cleanUp();
    } else if (
      isWalletConnectProvider(web3state.provider?.provider) ||
      isCoinbaseProvider(web3state.provider?.provider)
    ) {
      await web3state.provider?.provider?.disconnect();
    }
    window.location.reload();
  };

  const connect: ConnectFn = async (wallet, options) => {
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
          coinbaseWallet.makeWeb3Provider(urls.polygonMainnetRpc, 137)
        );
        // if user is not already connected this request will prompt the wallet modal to open and the user to connect
        await provider.send("eth_requestAccounts", []);
        localStorage.setItem("web3-wallet", "coinbase");

        /** HANDLE WALLETCONNECT */
      } else if (
        wallet === "walletConnect" ||
        connectedWallet === "walletConnect"
      ) {
        if (!options?.walletConnectProjectId) {
          console.error("Failed to connect: missing walletConnectProjectId");
          return;
        }
        const { default: EthereumProvider } = await import(
          "@walletconnect/ethereum-provider"
        );

        const walletConnectProvider = await EthereumProvider.init({
          projectId: options.walletConnectProjectId,
          chains: [137],
          showQrModal: true,
        });

        await walletConnectProvider.enable();
        provider = getWeb3Provider(walletConnectProvider);
        localStorage.setItem("web3-wallet", "walletConnect");

        /** HANDLE TORUS AND TORUS-MUMBAI*/
      } else if (
        wallet === "torus" ||
        connectedWallet === "torus" ||
        wallet === "torus-mumbai" ||
        connectedWallet === "torus-mumbai"
      ) {
        const isTestnet =
          wallet === "torus-mumbai" || connectedWallet === "torus-mumbai";
        const { default: Torus } = await import("@toruslabs/torus-embed");
        const torus = new Torus();
        await torus.cleanUp();
        await torus.init({
          buildEnv: "production",
          enableLogging: false,
          network: {
            host: isTestnet
              ? polygonNetworks["testnet"].rpcUrls[0]
              : polygonNetworks["mainnet"].rpcUrls[0],
            chainId: isTestnet
              ? parseInt(polygonNetworks["testnet"].hexChainId, 16)
              : parseInt(polygonNetworks["mainnet"].hexChainId, 16),
            networkName: isTestnet
              ? polygonNetworks["testnet"].chainName
              : polygonNetworks["mainnet"].chainName,
            blockExplorer: isTestnet
              ? polygonNetworks["testnet"].blockExplorerUrls[0]
              : polygonNetworks["mainnet"].blockExplorerUrls[0],
            ticker: "MATIC",
            tickerName: "Polygon",
          },
        });

        if (!options?.useCache) {
          try {
            await torus.login();
          } catch (error) {
            console.error("Torus login failed:", error);
          }
        } else {
          if (!torus.isLoggedIn) {
            throw new Error("User not logged in");
          }
        }

        if (!torus.provider) {
          throw new Error("Torus provider not available");
        }

        provider = getWeb3Provider(torus.provider);
        (provider.provider as TorusProvider).torus = torus; // inject so we can access this later (on disconnect)
        localStorage.setItem(
          "web3-wallet",
          isTestnet ? "torus-mumbai" : "torus"
        );
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
        networkLabel: isTestnetChainId(network.chainId) ? "mumbai" : "polygon",
        isConnected: true,
        initializing: false,
        isConnectionFromCache: options?.useCache || false,
      };
      setWeb3State(newState);
    } catch (e: any) {
      if (
        // TODO check message for coinbase when it is working again
        e.code === 4001 || // metamask
        e.message === "User closed modal" || // wallet connect
        e.message === "User cancelled login" || // torus message
        e.message === "User denied account authorization" // coinbase message
      ) {
        localStorage.removeItem("web3-wallet");
        e.name = "rejected";
      }
      throw e;
    }
  };

  // Auto connect to the cached provider if web3-wallet has a value
  useEffect(() => {
    const wallet = localStorage.getItem("web3-wallet") as WalletLabel | null;
    if (wallet) {
      connect(wallet, { useCache: true, walletConnectProjectId });
    } else {
      setWeb3State((s: Web3State) => ({ ...s, initializing: false }));
    }
  }, []);

  // EIP-1193 events
  useEffect(() => {
    if (!web3state.provider || isTorusProvider(web3state.provider.provider)) {
      // no need to listen to torus events. They do not have any external control
      return;
    }
    // @todo -> Makka fix types and remove any.
    const handleAccountsChanged = (accts: string[] | any) => {
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
