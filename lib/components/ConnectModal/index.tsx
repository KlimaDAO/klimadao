import { cx } from "@emotion/css";
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
  TwitterIcon,
  WalletConnectIcon,
} from "../.";
import { useFocusTrap, useScrollLock, useWeb3 } from "../../utils";
import * as styles from "./styles";

// ems modules and javascript are strange so we import like this
const Close = (CloseDefault as any).default as any;
const MailOutlineIcon = (MailOutlineIconDefault as any).default as any;
const ExtensionIcon = (ExtensionIconDefault as any).default as any;

export interface ConnectModalProps {
  appName?: string;
  torusText: string;
  walletText: string;
  titles: {
    connect: string;
    loading: string;
    error: string;
  };
  buttonClassName?: string;
  errors: {
    default: string;
    rejected: string;
    alreadyProcessing: string;
  };
  /** Callback invoked when the modal is closed by X or click-off, NOT invoked on successful connection */
  onClose?: () => void;
  showModal: boolean;
  showMumbaiOption?: boolean;
  walletConnectProjectId?: string;
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
  const [errorName, setErrorName] = useState<
    "default" | "rejected" | "alreadyProcessing" | undefined
  >();
  const [isMumbai, setIsMumbai] = useState(false);

  useEffect(() => {
    if (window) setEth((window as any).ethereum as WindowEthereum);
  }, []);

  const showBrave = eth?.isBraveWallet;
  const showMetamask = eth?.isMetaMask;
  const isInjectedCoinbase = eth?.isCoinbaseWallet;
  const showBrowserWallet = eth && !showBrave && !showMetamask;

  const getTitle = (step: "connect" | "error" | "loading") =>
    !props.titles ? "loading" : props.titles[step];

  useEffect(() => {
    if (props.showModal) {
      setStep("connect");
    }
  }, [props.showModal]);

  useScrollLock(props.showModal);

  const handleConnect = async (params: {
    wallet:
      | "coinbase"
      | "torus"
      | "torus-mumbai"
      | "walletConnect"
      | "injected";
  }) => {
    try {
      if (!params.wallet || !connect) return;
      setStep("loading");
      if (params.wallet === "injected") {
        await connect("injected");
      } else if (params.wallet === "coinbase") {
        await connect("coinbase");
      } else if (params.wallet === "walletConnect") {
        await connect("walletConnect", {
          walletConnectProjectId: props.walletConnectProjectId,
        });
      } else if (params.wallet === "torus") {
        await connect("torus");
      } else if (params.wallet === "torus-mumbai") {
        await connect("torus-mumbai");
      }
      toggleModal();
      setStep("connect");
    } catch (e: any) {
      console.error(e);
      if (e.name === "rejected") {
        setErrorName(e.name);
      } else if (e.message.includes("processing eth_requestAccounts")) {
        setErrorName("alreadyProcessing");
      } else {
        setErrorName("default");
      }
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
            <div>
              <p className={styles.h3}>{getTitle(step)}</p>
            </div>
            <button onClick={handleClose} className={styles.closeButton}>
              <Close fontSize="large" />
            </button>
          </span>
          {step === "connect" && (
            <div className={styles.connectContent}>
              <span className={styles.textBox}>
                <div className={styles.leftLine} />
                <p className={styles.subText}>{props.torusText}</p>
                <div className={styles.rightLine} />
              </span>
              {props.showMumbaiOption && (
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id="mumbai"
                    onChange={() => setIsMumbai((s) => !s)}
                    checked={isMumbai}
                  />
                  <label htmlFor="mumbai">Use Mumbai Torus</label>
                </div>
              )}
              <button
                className={styles.torusButtons}
                onClick={() =>
                  handleConnect({ wallet: isMumbai ? "torus-mumbai" : "torus" })
                }
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
                <span className={cx([styles.buttonBackground, styles.email])}>
                  <MailOutlineIcon />
                </span>
              </button>
              <div className={styles.buttonsContainer}>
                <span className={styles.textBox}>
                  <div className={styles.leftLine} />
                  <p className={styles.subText}>{props.walletText}</p>
                  <div className={styles.rightLine} />
                </span>
                {showMetamask && (
                  <button
                    className={styles.walletButton}
                    onClick={() => handleConnect({ wallet: "injected" })}
                  >
                    <MetaMaskFoxIcon />
                    <p className={styles.button}>Metamask</p>
                  </button>
                )}
                {showBrave && (
                  <button
                    className={styles.walletButton}
                    onClick={() => handleConnect({ wallet: "injected" })}
                  >
                    <BraveIcon />
                    <p className={styles.button}>Brave</p>
                  </button>
                )}
                {showBrowserWallet && (
                  <button
                    className={styles.walletButton}
                    onClick={() => handleConnect({ wallet: "injected" })}
                  >
                    <ExtensionIcon className={styles.browserWalletIcon} />
                    <p className={styles.button}>Browser Injected Wallet</p>
                  </button>
                )}
                <button
                  className={styles.walletButton}
                  onClick={() =>
                    handleConnect({
                      wallet: isInjectedCoinbase ? "injected" : "coinbase",
                    })
                  }
                >
                  <CoinbaseWalletIcon />
                  <p className={styles.button}>Coinbase</p>
                </button>
                <button
                  className={styles.walletButton}
                  onClick={() => handleConnect({ wallet: "walletConnect" })}
                >
                  <WalletConnectIcon />
                  <p className={styles.button}>walletconnect</p>
                </button>
              </div>
            </div>
          )}
          {step === "loading" && (
            <div
              className={cx(styles.spinner, {
                [styles.carbonmark]: props.appName === "carbonmark",
              })}
            >
              <Spinner />
            </div>
          )}
          {step === "error" && (
            <div className={styles.errorContent}>
              <p className={styles.body1}>
                {props.errors[errorName ?? "default"]}
              </p>
              <ButtonPrimary
                label="OK"
                onClick={() => setStep("connect")}
                className={styles.errorButton}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
