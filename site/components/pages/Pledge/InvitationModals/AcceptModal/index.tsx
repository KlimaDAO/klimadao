import React, { useState } from "react";

import { ButtonPrimary, ButtonSecondary, Text } from "@klimadao/lib/components";
import { Modal } from "components/Modal";
import * as styles from "../../PledgeDashboard/styles";
import { t, Trans } from "@lingui/macro";
import {
  approveSecondaryWallet,
  removeSecondaryWallet,
} from "../../lib/editPledgeMessage";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
import { Pledge } from "../../types";
import { putPledge, pledgeFormAdapter } from "../../lib";

type Props = {
  pageAddress: string;
  pledge: Pledge;
  setShowAcceptModal: (value: boolean) => void;
  showAcceptModal: boolean;
};

const getTitle = (step: string) =>
  ({
    accept: t({
      id: "pledge.invitation.accept",
      message: "Accept Invitation",
    }),
    confirm: t({ id: "shared.confirm", message: "Confirm" }),
  }[step]);

type Steps = "accept" | "confirm" | "error";

export const AcceptModal = (props: Props) => {
  const { signer } = useWeb3();
  const [step, setStep] = useState<Steps>("accept");

  const shortenedAddress = concatAddress(props.pledge.ownerAddress);

  const handleSubmit = async (params: {
    message: (nonce: string) => string;
  }) => {
    try {
      if (!signer) return;
      const address = await signer.getAddress();
      const signature = await signer.signMessage(
        params.message(props.pledge.nonce)
      );

      await putPledge({
        pageAddress: props.pageAddress,
        secondaryWalletAddress: address,
        pledge: pledgeFormAdapter(props.pledge),
        signature,
        urlPath: `/pledge/${props.pageAddress}`,
      });

      props.setShowAcceptModal(false);
    } catch {
      console.log("uh ohhh");
      setStep("error");
    }
  };

  return (
    <Modal
      title={getTitle(step)}
      showModal={true}
      // showModal={props.showAcceptModal}
      onToggleModal={() => props.setShowAcceptModal(false)}
    >
      {step === "accept" && (
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
              onClick={() => handleSubmit({ message: removeSecondaryWallet })}
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
              onClick={() => {
                handleSubmit({
                  message: approveSecondaryWallet,
                });
              }}
            />
            <ButtonSecondary
              label={t({ id: "shared.cancel", message: "Cancel" })}
              onClick={() => {
                setStep("accept");
              }}
              variant="gray"
            />
          </div>
        </>
      )}

      {step === "error" && (
        // show error
        <>Error</>
      )}
    </Modal>
  );
};
