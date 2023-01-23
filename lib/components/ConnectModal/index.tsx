import CloseDefault from "@mui/icons-material/Close";
import ExtensionIconDefault from "@mui/icons-material/Extension";
import MailOutlineIconDefault from "@mui/icons-material/MailOutline";
import { providers } from "ethers";
import React, { useEffect, useState } from "react";
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
import { useFocusTrap, useWeb3 } from "../../utils";
import * as styles from "./styles";

// ems modules and javascript are strange so we import like this
const Close = (CloseDefault as any).default as any;
const MailOutlineIcon = (MailOutlineIconDefault as any).default as any;
const ExtensionIcon = (ExtensionIconDefault as any).default as any;
export interface ConnectModalProps {
  errorMessage: string;
  torusText: string;
  titles: {
    connect: string;
    loading: string;
    error: string;
  };
  buttonClassName?: string;
  /** Callback invoked when the modal is closed by X or click-off, NOT invoked on successful connection */
  onClose?: () => void;
  showModal: boolean;
}

type WindowEthereum = providers.ExternalProvider & {
  isBraveWallet: boolean;
  isCoinbaseWallet: boolean;
};

export const ConnectModal = (props: ConnectModalProps) => {
  const [step, setStep] = useState<"connect" | "error" | "loading">("connect");
  const { connect, toggleModal } = useWeb3();
  const focusTrapRef = useFocusTrap();
  const [eth, setEth] = useState<WindowEthereum | undefined>(undefined);

  useEffect(() => {
    if (window) setEth((window as any).ethereum as WindowEthereum);
  }, []);

  const showBrave = eth?.isBraveWallet;
  const showMetamask = eth?.isMetaMask;
  const showCoinbaseWallet = eth?.isCoinbaseWallet;

  const getTitle = (step: "connect" | "error" | "loading") =>
    !props.titles ? "loading" : props.titles[step];
  useEffect(() => {
    if (props.showModal) {
      setStep("connect");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [props.showModal]);
  const handleConnect = async (params: {
    wallet: "coinbase" | "torus" | "walletConnect" | "injected";
  }) => {
    try {
      if (!params.wallet) return;
      setStep("loading");
      if (params.wallet === "injected" && connect) {
        await connect("injected");
      } else if (params.wallet === "coinbase" && connect) {
        await connect("coinbase");
      } else if (params.wallet === "walletConnect" && connect) {
        await connect("walletConnect");
      } else if (params.wallet === "torus" && connect) {
        await connect("torus");
      }
      toggleModal();
      setStep("connect");
    } catch (e: any) {
      console.error(e);
      setStep("error");
    }
  };

  const handleClose = () => {
    if (props.showModal) {
      toggleModal();
      props.onClose?.();
    }
  };

  if (!props.showModal) return null;
  return (
    <div aria-modal={true}>
      <div className={styles.modalBackground} onClick={handleClose} />
      <div className={styles.modalContainer}>
        <div className={styles.modalContent} ref={focusTrapRef}>
          <span className="title">
            <Text t="h4">{getTitle(step)}</Text>
            <button onClick={handleClose}>
              <Close fontSize="large" />
            </button>
          </span>
          {step === "connect" && (
            <>
              <div className={styles.buttonsContainer}>
                {showMetamask && (
                  <span
                    className={styles.walletButton}
                    onClick={() => handleConnect({ wallet: "injected" })}
                  >
                    <MetaMaskFoxIcon />
                    <Text t="button">Metamask</Text>
                  </span>
                )}
                {showBrave && (
                  <span
                    className={styles.walletButton}
                    onClick={() => handleConnect({ wallet: "injected" })}
                  >
                    <BraveIcon />
                    <Text t="button">Brave</Text>
                  </span>
                )}
                {!showBrave && !showMetamask && eth && (
                  <span
                    className={styles.walletButton}
                    onClick={() => handleConnect({ wallet: "injected" })}
                  >
                    <ExtensionIcon className={styles.browserWalletIcon} />
                    <Text t="button">Browser</Text>
                  </span>
                )}
                <span
                  className={styles.walletButton}
                  onClick={() =>
                    handleConnect({
                      wallet: showCoinbaseWallet ? "injected" : "coinbase",
                    })
                  }
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
                  {props.torusText}
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
            </>
          )}
          {step === "loading" && (
            <div className={styles.spinner}>
              <Spinner />
            </div>
          )}
          {step === "error" && (
            <div className={styles.errorContent}>
              <Text t="body2">{props.errorMessage}</Text>
              <ButtonPrimary label="OK" onClick={() => setStep("connect")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
