import { useEffect, useRef, useState } from "react";
import type Web3Modal from "web3modal";
import { providers } from "ethers";
import {
  web3InitialState,
  ConnectedWeb3State,
  Web3ModalState,
  Web3ModalStrings,
  Web3State,
  TypedProvider,
} from "../../components/Web3Context/types";

/** React Hook to create and manage the web3Modal lifecycle */
export const useWeb3Modal = (strings: Web3ModalStrings): Web3ModalState => {
  const [web3state, setWeb3State] = useState<Web3State>(web3InitialState);
  const modalRef = useRef<Web3Modal>();
  const [prevStrings, setPrevStrings] = useState<Web3ModalStrings>(strings);

  const disconnect = async () => {
    if (modalRef.current?.cachedProvider) {
      modalRef.current.clearCachedProvider();
    }
    // setWeb3State(web3InitialState);
    if (web3state && (web3state.provider?.provider as any)?.isTorus === true) {
      await (web3state.provider?.provider as any).torus.cleanUp();
      // triggers reload via accountsChanged
    } else {
      window.location.reload();
    }
  };

  const downloadModal = async () => {
    const newModal = (await import("../getWeb3Modal")).getWeb3Modal(strings);
    setPrevStrings(strings);
    return newModal;
  };

  const connect = async () => {
    if (!modalRef.current || strings.torus_name !== prevStrings.torus_name) {
      modalRef.current = await downloadModal();
    }
    const wrappedProvider = await modalRef.current.connect();
    const provider = new providers.Web3Provider(
      wrappedProvider
    ) as unknown as TypedProvider; // assert for better typings, see event handlers below
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    const newState: ConnectedWeb3State = {
      provider,
      signer,
      address,
      network,
      isConnected: true,
    };
    setWeb3State(newState);
  };

  // Auto download dependencies and connect to the cached provider
  useEffect(() => {
    const init = async () => {
      if (!modalRef.current) {
        modalRef.current = await downloadModal();
      }
      if (modalRef.current.cachedProvider) {
        connect();
      }
    };
    init();
  }, []);

  // EIP-1193 events
  useEffect(() => {
    if (!web3state.provider) return;
    const handleDisconnect = () => {
      // when force-disconnecting via metamask ui, prevent an infinite reconnect loop
      modalRef.current?.clearCachedProvider();
      window.location.reload();
    };
    const handleAccountsChanged = () => {
      window.location.reload();
    };

    /** There is a bug where ethers doesn't respond to web3modal events for these two, so we use the nested provider
     * https://github.com/ethers-io/ethers.js/issues/2988 */
    web3state.provider.provider.on("accountsChanged", handleAccountsChanged);
    web3state.provider.on("disconnect", handleDisconnect);

    return () => {
      web3state.provider.provider.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
      web3state.provider.removeListener("disconnect", handleDisconnect);
    };
  }, [web3state.provider]);

  return {
    ...web3state,
    connect,
    disconnect,
  };
};
