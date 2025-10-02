/** Separate file to avoid circular deps between Web3Context and useWeb3Modal */

import type { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import type Torus from "@toruslabs/torus-embed";
import type EthereumProvider from "@walletconnect/ethereum-provider";
import type { providers } from "ethers";

// Function overloads because "accountsChanged" returns an array of strings, but the others don't.
// Ethers did not have these properly typed.
declare function ProviderEventHandler(
  evt: "accountsChanged",
  cb: (accts: string[]) => void
): void;
declare function ProviderEventHandler(
  evt: "chainChanged",
  cb: () => void
): void;
declare function ProviderEventHandler(evt: "disconnect", cb: () => void): void;

interface WrappedWeb3Provider extends providers.ExternalProvider {
  on: typeof ProviderEventHandler;
  removeListener: typeof ProviderEventHandler;
}
export type TorusProvider = providers.ExternalProvider & { torus: Torus };
export type WalletConnectProvider = EthereumProvider;
/** Coinbase has these methods, but the types are wrong. */
export type CoinbaseProvider = CoinbaseWalletProvider & {
  sendAsync: providers.ExternalProvider["sendAsync"];
  send: providers.ExternalProvider["sendAsync"];
};
export type WrappedProvider =
  | WrappedWeb3Provider
  | WalletConnectProvider
  | CoinbaseProvider
  | TorusProvider;

/** Ethers doesn't type the wrapped provider, so we have to type it to support `provider.provider.on('accountsChanged')` and isTorus, etc. */
export interface TypedProvider extends providers.Web3Provider {
  provider: WrappedProvider;
}

export interface Web3ModalStrings {
  walletconnect_desc: string;
  coinbase_desc: string;
  injected_desc: string;
  torus_name: string;
  torus_desc: string;
}

/**
 * Interface for the state when the Web3 connection is established.
 */
export interface ConnectedWeb3State {
  /** Indicates if the connection is established */
  isConnected: true;
  /** The provider used for the connection */
  provider: TypedProvider;
  /** The address of the connected account */
  address: string;
  /** The signer used for signing transactions */
  signer: providers.JsonRpcSigner;
  /** The network to which the connection is established */
  network: providers.Network;
  /** The label of the network */
  networkLabel: "polygon" | "mumbai";
  /** Indicates if the connection is being initialized */
  initializing: false;
  /** Indicates if the connection is from cache */
  isConnectionFromCache: boolean;
}

export interface DisconnectedWeb3State {
  isConnected: false;
  provider: undefined;
  web3Provider: undefined;
  address: undefined;
  signer: undefined;
  network: undefined;
}
export interface RenderModalProps {
  torusText: string;
  walletText: string;
  titles: {
    connect: string;
    loading: string;
    error: string;
  };
  errors: {
    default: string;
    rejected: string;
    alreadyProcessing: string;
  };
  buttonClassName?: string;
  onClose?: () => void;
  showMumbaiOption?: boolean;
}

export type Web3State = ConnectedWeb3State | DisconnectedWeb3State;

export type WalletLabel =
  | "torus"
  | "torus-mumbai"
  | "walletconnect"
  | "coinbase"
  | "injected"
  | "walletConnect";

export type ConnectFn = (
  wallet?: WalletLabel,
  options?: { useCache?: boolean; walletConnectProjectId?: string }
) => Promise<void>;

/** Union of two interfaces because connect() and disconnect() logic is only available after the modal is instantiated, at runtime */
export type Web3ModalState = Web3State & {
  connect?: ConnectFn;
  disconnect?: () => Promise<void>;
  showModal: boolean;
  renderModal: (props: RenderModalProps) => JSX.Element;
  toggleModal: () => void;
  initializing: boolean;
  isConnectionFromCache: boolean | undefined;
  networkLabel: "polygon" | "mumbai";
};

export const web3InitialState: Web3ModalState = {
  isConnected: false,
  initializing: true,
  provider: undefined,
  web3Provider: undefined,
  address: undefined,
  signer: undefined,
  network: undefined,
  networkLabel: "polygon",
  showModal: false,
  isConnectionFromCache: undefined,
  renderModal: () => undefined as unknown as JSX.Element,
  toggleModal: () => undefined,
};
