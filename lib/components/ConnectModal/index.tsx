import React, { useEffect, useState } from "react";
import { concatAddress, useWeb3 } from "../../utils";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import { ConnectContent } from "./ConnectContent";

export const ConnectModal = (props: {
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
}) => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<"connect" | "error" | "loading">("connect");
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);
  const { address, connect, disconnect, isConnected } = useWeb3();

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
          variant="blue"
        />
      ) : (
        <ButtonPrimary
          label={props.buttonText}
          onClick={() => {
            setShowModal(true);
          }}
          variant="blue"
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
