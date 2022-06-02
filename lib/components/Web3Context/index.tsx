import { ethers } from "ethers";
import React, { createContext, FC, useContext } from "react";

import { useWeb3Modal, Web3ModalStrings } from "../../utils/useWeb3Modal";

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

export const Web3Context = createContext<Web3ProviderState>(web3InitialState);

interface Props {
  strings: Web3ModalStrings;
}
/** Init the web3Modal and expose via react context  */
export const Web3ContextProvider: FC<Props> = (props) => {
  const web3ProviderState = useWeb3Modal(props.strings);

  return (
    <Web3Context.Provider value={web3ProviderState}>
      {props.children}
    </Web3Context.Provider>
  );
};

/**
 * A hook for accessing the Web3Context. Must be child of context provider.
 * @example const { provider, address, signer, isConnected } = useWeb3();
 */
export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3ContextProvider");
  }
  return context;
};
