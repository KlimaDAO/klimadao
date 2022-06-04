/** Separate file to avoid circular deps between Web3Context and useWeb3Modal */

import { providers } from "ethers";

export interface Web3ModalStrings {
  walletconnect_desc: string;
  coinbase_desc: string;
  injected_desc: string;
  torus_name: string;
  torus_desc: string;
}

export type Web3Action =
  | {
      type: "CONNECT";
      payload: ConnectedWeb3State;
    }
  | {
      type: "DISCONNECT";
    }
  | {
      type: "SET_NETWORK";
      payload: ConnectedWeb3State["network"];
    }
  | {
      type: "SET_ADDRESS";
      payload: ConnectedWeb3State["address"];
    };

export interface ConnectedWeb3State {
  isConnected: true;
  provider: providers.Web3Provider;
  address: string;
  signer: providers.JsonRpcSigner;
  network: providers.Network;
}

export interface DisconnectedWeb3State {
  isConnected: false;
  provider: undefined;
  web3Provider: undefined;
  address: undefined;
  signer: undefined;
  network: undefined;
}

export type Web3State = ConnectedWeb3State | DisconnectedWeb3State;

/** Union of two interfaces because connect() and disconnect() logic is only available after the modal is instantiated, at runtime */
export type Web3ModalState = Web3State & {
  connect?: () => Promise<void>;
  disconnect?: () => Promise<void>;
};

export const web3InitialState: Web3ModalState = {
  isConnected: false,
  provider: undefined,
  web3Provider: undefined,
  address: undefined,
  signer: undefined,
  network: undefined,
  connect: undefined,
  disconnect: undefined,
};
