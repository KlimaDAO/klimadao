import React, { createContext, FC, useState } from "react";

import { useProvider } from "../../utils/useProvider";
import { ConnectModal } from "../ConnectModal";
import { web3InitialState, Web3ModalState } from "./types";

export const Web3Context = createContext<Web3ModalState>(web3InitialState);

interface Props {
  children: React.ReactNode;
}
/** Init the web3Modal and expose via react context  */
export const Web3ContextProvider: FC<Props> = (props) => {
  const providerState = useProvider();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((s: boolean) => !s);
  const renderModal = (props: any) => (
    <ConnectModal showModal={showModal} {...props} />
  );
  return (
    <Web3Context.Provider
      value={{ ...providerState, renderModal, toggleModal }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};
