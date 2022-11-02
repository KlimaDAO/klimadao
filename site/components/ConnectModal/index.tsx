import React, { useEffect, useState } from "react";
import Close from "@mui/icons-material/Close";
import * as styles from "./styles";
import { Text, ButtonPrimary } from "@klimadao/lib/components";
import { useFocusTrap } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";

export const ConnectModal = () => {
  const focusTrapRef = useFocusTrap();
  const [showModal, setShowModal] = useState(false);
  const { address, connect, disconnect, isConnected } = useWeb3();

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);

  const handleConnect = (props: {
    wallet?: "coinbase" | "torus" | "walletConnect" | "metamask";
  }) => {
    if (window.ethereum && connect && props.wallet === "metamask") {
      connect("metamask");
    } else if (props.wallet === "coinbase" && connect) {
      connect("coinbase");
    } else if (props.wallet === "walletConnect" && connect) {
      connect("walletConnect");
    } else if (props.wallet === "torus") {
      console.log("torus");
    }
  };

  return (
    <>
      {isConnected && address ? (
        <ButtonPrimary label={concatAddress(address)} onClick={disconnect} />
      ) : (
        <ButtonPrimary
          label={t({ id: "shared.connect", message: "Connect" })}
          onClick={() => setShowModal(true)}
        />
      )}
      {showModal ? (
        <div aria-modal={true}>
          <div
            className={styles.modalBackground}
            onClick={() => setShowModal(false)}
          />
          <div className={styles.modalContainer}>
            <div className={styles.modalContent} ref={focusTrapRef}>
              <div className="title">
                <Text t="h4">
                  <Trans>Sign In / Connect</Trans>
                </Text>
                <button onClick={() => setShowModal(false)}>
                  <Close fontSize="large" />
                </button>
              </div>

              <button onClick={() => handleConnect({ wallet: "metamask" })}>
                Metamask
              </button>
              <br />
              <button onClick={() => handleConnect({ wallet: "coinbase" })}>
                Coinbase
              </button>
              <br />
              <button
                onClick={() => handleConnect({ wallet: "walletConnect" })}
              >
                wallet connect
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
