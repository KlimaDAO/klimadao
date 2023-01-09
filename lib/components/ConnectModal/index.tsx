import CloseDefault from "@mui/icons-material/Close";
import MailOutlineIconDefault from "@mui/icons-material/MailOutline";
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
interface Props {
  errorMessage: string;
  torusText: string;
  titles: {
    connect: string;
    loading: string;
    error: string;
  };
  buttonText: string;
  buttonClassName?: string;
  onClose?: () => void;
}

export const ConnectModal = (props: Props) => {
  const [step, setStep] = useState<"connect" | "error" | "loading">("connect");
  const { connect, showModal, setShowModal } = useWeb3();
  console.log("showModal in connect modal", showModal);
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
  useEffect(() => {
    if (showModal) {
      setStep("connect");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);
  const handleConnect = async (params: {
    wallet: "coinbase" | "torus" | "walletConnect" | "metamask" | "brave";
  }) => {
    try {
      if (!params.wallet) return;
      setStep("loading");
      if (params.wallet === "metamask" && connect) {
        await connect("metamask");
      } else if (params.wallet === "coinbase" && connect) {
        await connect("coinbase");
      } else if (params.wallet === "walletConnect" && connect) {
        await connect("walletConnect");
      } else if (params.wallet === "torus" && connect) {
        await connect("torus");
      } else if (params.wallet === "brave" && connect) {
        await connect("brave");
      }
      setShowModal && setShowModal(false);
      setStep("connect");
      props.onClose && props.onClose();
    } catch (e: any) {
      console.error(e);
      setStep("error");
    }
  };
  showModal ? (
    <div aria-modal={true}>
      <div
        className={styles.modalBackground}
        onClick={() => setShowModal && setShowModal(false)}
      />
      <div className={styles.modalContainer}>
        <div className={styles.modalContent} ref={focusTrapRef}>
          <span className="title">
            <Text t="h4">{getTitle(step)}</Text>
            <button onClick={() => setShowModal && setShowModal(false)}>
              <Close fontSize="large" />
            </button>
          </span>
          {step === "connect" && (
            <>
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
  ) : (
    <></>
  );
};
