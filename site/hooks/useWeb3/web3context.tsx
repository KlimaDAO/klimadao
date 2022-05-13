import React, { FC, createContext, useContext } from "react";

import { useWeb3State } from ".";
import { Web3ProviderState, web3InitialState } from "./reducers";

const Web3Context = createContext<Web3ProviderState>(web3InitialState);

export const Web3ContextProvider: FC = ({ children }) => {
  const web3ProviderState = useWeb3State();

  return (
    <Web3Context.Provider value={web3ProviderState}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3ContextProvider");
  }

  return context;
};
