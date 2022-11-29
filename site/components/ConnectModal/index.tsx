import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";

const DynamicContent = dynamic(
  () => import("./ConnectContent").then((mod) => mod.ConnectContent),
  {
    ssr: false,
  }
);

export const ConnectModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState("connect");
  const { address, connect, disconnect, isConnected } = useWeb3();
  console.log(showModal);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);

  const handleConnect = async (props: {
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
      <DynamicContent
        showModal={showModal}
        handleConnect={handleConnect}
        setShowModal={setShowModal}
        step={step}
        setStep={setStep}
      />
    </>
  );
};
