import { ethers } from "ethers";

export type Web3ProviderState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any;
  web3Provider: ethers.providers.Web3Provider | null;
  address: string | null;
  signer: ethers.providers.JsonRpcSigner | null;
  network: ethers.providers.Network | null;
  isConnected: boolean;
  connect?: () => Promise<void>;
  disconnect?: () => Promise<void>;
};

export const web3InitialState: Web3ProviderState = {
  provider: null,
  web3Provider: null,
  signer: null,
  address: null,
  network: null,
  isConnected: false,
};

export type Web3Action =
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

export function web3Reducer(
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
