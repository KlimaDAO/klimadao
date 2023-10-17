import React, { createContext, FC, useCallback, useState } from "react";

import { useProvider } from "../../utils/useProvider";
import { ConnectModal } from "../ConnectModal";
import { RenderModalProps, web3InitialState, Web3ModalState } from "./types";

export const Web3Context = createContext<Web3ModalState>(web3InitialState);

interface Props {
  appName?: string;
  children: React.ReactNode;
  showMumbaiOption?: boolean;
}

/** Init the web3Modal and expose via react context  */
export const Web3ContextProvider: FC<Props> = ({
  appName,
  children,
  showMumbaiOption,
}) => {
  const [ignoreChainId, setIgnoreChainId] = useState(false);
  const providerState = useProvider({ ignoreChainId });
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((s) => !s);
  const renderModal = useCallback(
    (props: RenderModalProps) => (
      <ConnectModal
        {...props}
        showModal={showModal}
        appName={appName}
        showMumbaiOption={showMumbaiOption}
      />
    ),
    [showModal]
  );
  return (
    <Web3Context.Provider
      value={{
        ...providerState,
        renderModal,
        toggleModal,
        ignoreChainId,
        setIgnoreChainId,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
