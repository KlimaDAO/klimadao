import React, { ReactChild, createContext, useContext } from "react";

import { useWeb3 } from ".";
import { Web3ProviderState, web3InitialState } from "./reducers";

const Web3Context = createContext<Web3ProviderState>(web3InitialState);

interface Props {
  children: ReactChild;
}

export const Web3ContextProvider = ({ children }: Props) => {
  const web3ProviderState = useWeb3();

  return (
    <Web3Context.Provider value={web3ProviderState}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3ContextProvider");
  }

  return context;
};
