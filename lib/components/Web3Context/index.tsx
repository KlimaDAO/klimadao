import React, { createContext, FC, useCallback, useState } from "react";

import { useProvider } from "../../utils/useProvider";
import { ConnectModal } from "../ConnectModal";
import { RenderModalProps, web3InitialState, Web3ModalState } from "./types";

export const Web3Context = createContext<Web3ModalState>(web3InitialState);

interface Props {
  appName?: string;
  children: React.ReactNode;
  showMumbaiOption?: boolean;
  walletConnectProjectId?: string;
}

/** Init the web3Modal and expose via react context  */
export const Web3ContextProvider: FC<Props> = ({
  appName,
  children,
  showMumbaiOption,
  walletConnectProjectId,
}) => {
  const providerState = useProvider();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((s) => !s);
  const renderModal = useCallback(
    (props: RenderModalProps) => (
      <ConnectModal
        {...props}
        showModal={showModal}
        appName={appName}
        showMumbaiOption={showMumbaiOption}
        walletConnectProjectId={walletConnectProjectId}
      />
    ),
    [showModal]
  );
  return (
    <Web3Context.Provider
      value={{ ...providerState, renderModal, toggleModal }}
    >
      {children}
    </Web3Context.Provider>
  );
};
