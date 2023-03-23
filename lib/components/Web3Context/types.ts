/** Separate file to avoid circular deps between Web3Context and useWeb3Modal */

import type { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import type Torus from "@toruslabs/torus-embed";
import type { TorusInpageProvider } from "@toruslabs/torus-embed";
import type Web3Provider from "@walletconnect/web3-provider";
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
export type TorusProvider = TorusInpageProvider & { torus: Torus };
export type WalletConnectProvider = Web3Provider;
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

export interface ConnectedWeb3State {
  isConnected: true;
  provider: TypedProvider;
  address: string;
  signer: providers.JsonRpcSigner;
  network: providers.Network;
  initializing: false;
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
  };
  buttonClassName?: string;
  onClose?: () => void;
}

export type Web3State = ConnectedWeb3State | DisconnectedWeb3State;

/** Union of two interfaces because connect() and disconnect() logic is only available after the modal is instantiated, at runtime */
export type Web3ModalState = Web3State & {
  connect?: (wallet?: string) => Promise<void>;
  disconnect?: () => Promise<void>;
  showModal: boolean;
  renderModal: (props: RenderModalProps) => JSX.Element;
  toggleModal: () => void;
  initializing: boolean;
};

export const web3InitialState: Web3ModalState = {
  isConnected: false,
  initializing: true,
  provider: undefined,
  web3Provider: undefined,
  address: undefined,
  signer: undefined,
  network: undefined,
  showModal: false,
  renderModal: () => undefined as unknown as JSX.Element,
  toggleModal: () => undefined,
};
