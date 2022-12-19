import React, { useEffect, useState } from "react";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import { concatAddress, useWeb3 } from "../../utils";
import { ConnectContent } from "./ConnectContent";

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
  buttonVariant?: "lightGray" | "gray" | "blue" | "red" | "transparent" | null;
  onClose?: () => void;
}

export const ConnectModal = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<"connect" | "error" | "loading">("connect");
  const { address, connect, disconnect, isConnected } = useWeb3();

  const buttonVariant = props.buttonVariant ?? null;

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);
<<<<<<< HEAD
=======
  useEffect(() => {
    if (showModal) {
      setStep("connect");
    }
  }, [showModal]);
  const { address, connect, disconnect, isConnected } = useWeb3();
>>>>>>> 6f1b03ce (reset modal to connect state when opening)

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
      setShowModal(false);
      setStep("connect");
      props.onClose && props.onClose();
    } catch (e: any) {
      console.error(e);
      setStep("error");
    }
  };

  return (
    <>
      {isConnected && address ? (
        <ButtonPrimary
          label={concatAddress(address)}
          onClick={disconnect}
          variant={buttonVariant}
        />
      ) : (
        <ButtonPrimary
          label={props.buttonText}
          onClick={() => {
            setShowModal(true);
          }}
          variant={buttonVariant}
          className={props.buttonClassName}
        />
      )}

      <ConnectContent
        showModal={showModal}
        handleConnect={handleConnect}
        setShowModal={setShowModal}
        step={step}
        setStep={setStep}
        errorMessage={props.errorMessage}
        torusText={props.torusText}
        titles={props.titles}
      />
    </>
  );
};
