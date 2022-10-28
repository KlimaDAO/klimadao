import React, { useState } from "react";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary, ButtonSecondary, Text } from "@klimadao/lib/components";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";

import { Modal } from "components/Modal";
import {
  approveSecondaryWallet,
  removeSecondaryWallet,
} from "../../lib/editPledgeMessage";
import { Pledge } from "../../types";
import { putPledge, pledgeFormAdapter } from "../../lib";
import * as styles from "../styles";

type Props = {
  setShowAcceptModal: (value: boolean) => void;
  showAcceptModal: boolean;
  pledge: Pledge;
  pageAddress: string;
};
type Steps = "accept" | "confirm" | "error";

export const AcceptModal = (props: Props) => {
  const [step, setStep] = useState<Steps>("accept");
  const [errorMessage, setErrorMessage] = useState(null);
  const shortenedAddress = concatAddress(props.pledge.ownerAddress);

  const getTitle = (status: string) =>
    ({
      accept: t({
        id: "pledge.invitation.accept",
        message: "Accept Invitation",
      }),
      confirm: t({
        id: "shared.confirm",
        message: "Confirm",
      }),
      error: t({
        id: "pledge.invitation.error_title",
        message: "Server Error",
      }),
    }[status]);
  const { signer } = useWeb3();

  const handleSubmit = async (params: { message: string }) => {
    try {
      if (!signer) return;
      const address = await signer.getAddress();
      const signature = await signer.signMessage(params.message);
      await putPledge({
        pageAddress: props.pageAddress,
        secondaryWalletAddress: address,
        pledge: pledgeFormAdapter(props.pledge),
        signature,
        urlPath: `/pledge/${props.pageAddress}`,
      });
      props.setShowAcceptModal(false);
    } catch (e: any) {
      console.log("error:", e);
      setStep("error");
      setErrorMessage(
        e.message ??
          t({
            id: "pledge.modal.default_error_message",
            message:
              "Something went wrong on our end. Please try again in a few minutes",
          })
      );
      console.log("error:", e);
    }
  };
  return (
    <Modal
      title={getTitle(status)}
      showModal={props.showAcceptModal}
      onToggleModal={() => props.setShowAcceptModal(false)}
    >
      {status === "accept" && (
        <>
          <Text className={styles.modalMessage} t="body2">
            <Trans id="pledge.invitation.join_message">
              {shortenedAddress} has invited you to add your wallet to this
              pledge. If you accept, then your carbon retirements will count
              toward {shortenedAddress}'s pledge. You may remove your wallet
              from this pledge at any time.
            </Trans>
          </Text>
          <div className={styles.modalButtons}>
            <ButtonPrimary
              label={t({
                id: "pledge.invitation.accept",
                message: "Accept Invitation",
              })}
              onClick={() => setStep("confirm")}
            />
            <ButtonSecondary
              label={t({
                id: "pledge.invitation.reject",
                message: "Reject Invitation",
              })}
              onClick={() =>
                handleSubmit({
                  message: removeSecondaryWallet(props.pledge.nonce),
                })
              }
              variant="red"
            />
            <ButtonSecondary
              label={t({
                id: "pledge.invitation.later",
                message: "Remind me later",
              })}
              onClick={() => props.setShowAcceptModal(false)}
              variant="gray"
            />
          </div>
        </>
      )}

      {step === "confirm" && (
        <>
          <Text t="body2" className={styles.modalMessage}>
            <Trans id="pledge.modal.wallet_add_confirm">
              Adding your wallet to this pledge will remove your wallet from any
              existing pledges under your wallet address. Those pledges will be
              redirected to this new pledge.
            </Trans>
          </Text>
          <div className={styles.modalButtons}>
            <ButtonPrimary
              label={t({ id: "pledge.modal.confirm", message: "Confirm" })}
              onClick={() =>
                handleSubmit({
                  message: approveSecondaryWallet(props.pledge.nonce),
                })
              }
            />
            <ButtonSecondary
              label={t({ id: "shared.cancel", message: "Cancel" })}
              onClick={() => setStep("accept")}
              variant="gray"
            />
          </div>
        </>
      )}
      {status === "error" && (
        <>
          <Text t="body2" className={styles.modalMessage}>
            {errorMessage ?? "Error"}
          </Text>
          <div className={styles.modalButtons}>
            <ButtonSecondary
              label={t({ id: "shared.okay", message: "Okay" })}
              onClick={() => {
                props.setShowAcceptModal(false);
              }}
            />
          </div>
        </>
      )}
    </Modal>
  );
};
