import CloseDefault from "@mui/icons-material/Close";
import MailOutlineIconDefault from "@mui/icons-material/MailOutline";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  BraveIcon,
  ButtonPrimary,
  CoinbaseWalletIcon,
  DiscordColorIcon,
  FacebookColorIcon,
  GoogleIcon,
  MetaMaskFoxIcon,
  Spinner,
  Text,
  TwitterIcon,
  WalletConnectIcon,
} from "../.";
import { useFocusTrap } from "../../utils";
import * as styles from "./styles";
// ems modules and javascript are strange so we import like this
const Close = (CloseDefault as any).default as any;
const MailOutlineIcon = (MailOutlineIconDefault as any).default as any;

export const ConnectContent = (props: {
  showModal: boolean;
  handleConnect: (params: {
    wallet: "coinbase" | "torus" | "walletConnect" | "metamask" | "brave";
  }) => void;
  setShowModal: (value: boolean) => void;
  step: "connect" | "error" | "loading";
  setStep: Dispatch<SetStateAction<"connect" | "error" | "loading">>;
  errorMessage: string;
  torusText: string;
  titles: {
    connect: string;
    loading: string;
    error: string;
  };
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

  const getTitle = (step: "connect" | "error" | "loading") =>
    !props.titles ? "loading" : props.titles[step];

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
                  {props.torusText}
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
              <Text t="body2">{props.errorMessage}</Text>
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
