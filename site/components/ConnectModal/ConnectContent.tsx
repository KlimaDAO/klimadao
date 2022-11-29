import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  Spinner,
} from "@klimadao/lib/components";
import { useFocusTrap } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";

export const ConnectContent = (props: {
  showModal: boolean;
  handleConnect: (props: {
    wallet?: "coinbase" | "torus" | "walletConnect" | "metamask" | "brave";
  }) => void;
  setShowModal: (value: boolean) => void;
  step: string;
  setStep: Dispatch<SetStateAction<string>>;
}) => {
  const focusTrapRef = useFocusTrap();
  const [showMetamask, setShowMetamask] = useState(false);
  const [showBrave, setShowBrave] = useState(false);

  useEffect(() => {
    if (window.ethereum && (window.ethereum as any).isBraveWallet) {
      setShowBrave(true);
    } else if (window.ethereum) {
      setShowMetamask(true);
    }
  }, []);

  const getTitle = (step: string) =>
    ({
      connect: t({ id: "connect_modal.sign_in", message: "Sign In / Connect" }),
      loading: t({ id: "connect_modal.connecting", message: "Connecting..." }),
      error: t({
        id: "connect_modal.error_title",
        message: "Connection Error",
      }),
    }[step]);

  return props.showModal ? (
    <div aria-modal={true}>
      <div
        className={styles.modalBackground}
        onClick={() => props.setShowModal(false)}
      />
      <div className={styles.modalContainer}>
        <div className={styles.modalContent} ref={focusTrapRef}>
          <span className="title">
            <Text t="h4">{getTitle(props.step)}</Text>
            <button onClick={() => props.setShowModal(false)}>
              <Close fontSize="large" />
            </button>
          </span>
          {props.step === "connect" && (
            <>
              <div className={styles.buttonsContainer}>
                {showMetamask && (
                  <span
                    className={styles.walletButton}
                    onClick={() => props.handleConnect({ wallet: "metamask" })}
                  >
                    <MetaMaskFoxIcon />
                    <Text t="button">Metamask</Text>
                  </span>
                )}
                {showBrave && (
                  <span
                    className={styles.walletButton}
                    onClick={() => props.handleConnect({ wallet: "metamask" })}
                  >
                    <BraveIcon />
                    <Text t="button">Brave</Text>
                  </span>
                )}
                <span
                  className={styles.walletButton}
                  onClick={() => props.handleConnect({ wallet: "coinbase" })}
                >
                  <CoinbaseWalletIcon />
                  <Text t="button">Coinbase</Text>
                </span>
                <span
                  className={styles.walletButton}
                  onClick={() =>
                    props.handleConnect({ wallet: "walletConnect" })
                  }
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
                onClick={() => props.handleConnect({ wallet: "torus" })}
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
            </>
          )}
          {props.step === "loading" && (
            <div className={styles.spinner}>
              <Spinner />
            </div>
          )}
          {props.step === "error" && (
            <div className={styles.errorContent}>
              <Text t="body2">
                <Trans id="connect_modal.error_message">
                  We had some trouble connecting. Please try again.
                </Trans>
              </Text>
              <ButtonPrimary
                label="OK"
                onClick={() => props.setStep("connect")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
