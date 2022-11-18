import React, { useEffect, useState } from "react";
import Close from "@mui/icons-material/Close";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import * as styles from "./styles";
import {
  Text,
  ButtonPrimary,
  MetaMaskFoxIcon,
  WalletConnectIcon,
  CoinbaseWalletIcon,
  TwitterIcon,
  FacebookColorIcon,
  GoogleIcon,
  DiscordColorIcon,
  BraveIcon,
} from "@klimadao/lib/components";
import { useFocusTrap } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";

export const ConnectModal = () => {
  const focusTrapRef = useFocusTrap();
  const [showModal, setShowModal] = useState(false);
  const [showMetamask, setShowMetamask] = useState(false);
  const [showBrave, setShowBrave] = useState(false);
  const { address, connect, disconnect, isConnected } = useWeb3();
  console.log(showModal);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);

  useEffect(() => {
    if (window.ethereum && (window.ethereum as any).isBraveWallet) {
      setShowBrave(true);
    } else if (window.ethereum) {
      setShowMetamask(true);
    }
  }, []);

  const handleConnect = (props: {
    wallet?: "coinbase" | "torus" | "walletConnect" | "metamask" | "brave";
  }) => {
    if (props.wallet === "metamask" && connect) {
      connect("metamask");
    } else if (props.wallet === "coinbase" && connect) {
      connect("coinbase");
    } else if (props.wallet === "walletConnect" && connect) {
      connect("walletConnect");
    } else if (props.wallet === "torus" && connect) {
      connect("torus");
    } else if (props.wallet === "brave" && connect) {
      connect("brave");
    }
  };

  return (
    <>
      {isConnected && address ? (
        <ButtonPrimary label={concatAddress(address)} onClick={disconnect} />
      ) : (
        <ButtonPrimary
          label={t({ id: "shared.connect", message: "Connect" })}
          onClick={() => {
            console.log("clicked");
            setShowModal(true);
          }}
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
              <span className="title">
                <Text t="h4">
                  <Trans>Sign In / Connect</Trans>
                </Text>
                <button onClick={() => setShowModal(false)}>
                  <Close fontSize="large" />
                </button>
              </span>
              <div className={styles.buttonsContainer}>
                {showMetamask && (
                  <span
                    className={styles.walletButton}
                    onClick={() => handleConnect({ wallet: "metamask" })}
                  >
                    <MetaMaskFoxIcon />
                    <Text t="button">Metamask</Text>
                  </span>
                )}
                {showBrave && (
                  <span
                    className={styles.walletButton}
                    onClick={() => handleConnect({ wallet: "metamask" })}
                  >
                    <BraveIcon />
                    <Text t="button">Brave</Text>
                  </span>
                )}
                <span
                  className={styles.walletButton}
                  onClick={() => handleConnect({ wallet: "coinbase" })}
                >
                  <CoinbaseWalletIcon />
                  <Text t="button">Coinbase</Text>
                </span>
                <span
                  className={styles.walletButton}
                  onClick={() => handleConnect({ wallet: "walletConnect" })}
                >
                  <WalletConnectIcon />
                  <Text t="button">walletconnect</Text>
                </span>
              </div>
              <span className={styles.continueBox}>
                <div className={styles.leftLine} />
                <Text className={styles.continueText} t="badge">
                  <Trans id="connectModal.continue">or continue with</Trans>
                </Text>
                <div className={styles.rightLine} />
              </span>
              <div
                className={styles.torusButtons}
                onClick={() => handleConnect({ wallet: "torus" })}
              >
                <span className={styles.buttonBackground}>
                  <TwitterIcon className={styles.twitter} />
                </span>
                <span className={styles.buttonBackground}>
                  <FacebookColorIcon />
                </span>
                <span className={styles.buttonBackground}>
                  <GoogleIcon />
                </span>
                <span className={styles.buttonBackground}>
                  <DiscordColorIcon className={styles.discord} />
                </span>
                <span className={styles.buttonBackground}>
                  <MailOutlineIcon fontSize="large" />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
