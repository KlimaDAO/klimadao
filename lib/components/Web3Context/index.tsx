import React, { createContext, FC } from "react";

import { useWeb3Modal } from "../../utils/useWeb3Modal";
import { web3InitialState, Web3ModalState } from "./types";

export const Web3Context = createContext<Web3ModalState>(web3InitialState);

interface Props {
  children: React.ReactNode;
}
/** Init the web3Modal and expose via react context  */
export const Web3ContextProvider: FC<Props> = (props) => {
  const web3ProviderState = useWeb3Modal();

  return (
    <Web3Context.Provider value={web3ProviderState}>
      {props.children}
    </Web3Context.Provider>
  );
};
