import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  ButtonPrimary,
  ButtonSecondary,
  Spinner,
  Text,
} from "@klimadao/lib/components";
import { Modal } from "components/Modal";
import * as styles from "../styles";
import { t, Trans } from "@lingui/macro";
import { removeSecondaryWallet } from "../../lib/editPledgeMessage";
import { Pledge } from "../../types";
import { useWeb3 } from "@klimadao/lib/utils";
import { putPledge, pledgeFormAdapter } from "../../lib";

type Props = {
  setShowRemoveModal: (value: boolean) => void;
  showRemoveModal: boolean;
  pledge: Pledge;
  pageAddress: string;
};

type Steps = "remove" | "confirm" | "error" | "loading";

export const RemoveModal = (props: Props) => {
  const [step, setStep] = useState<Steps>("remove");
  const [errorMessage, setErrorMessage] = useState(null);
  const getTitle = (step: string) =>
    ({
      remove: t({ id: "pledge.modal.edit_pledge", message: "Edit pledge" }),
      confirm: t({
        id: "pledge.modal.confirm_remove",
        message: "Confirm Removal",
      }),
      error: t({
        id: "pledge.invitation.error_title",
        message: "Server Error",
      }),
      loading: t({
        id: "shared.loading",
        message: "Loading",
      }),
    }[step]);

  const { signer } = useWeb3();
  const handleSubmit = async (params: { message: string }) => {
    try {
      if (!signer) return;
      const address = await signer.getAddress();
      const signature = await signer.signMessage(params.message);
      setStep("loading");
      await putPledge({
        pageAddress: props.pageAddress,
        secondaryWalletAddress: address,
        pledge: pledgeFormAdapter(props.pledge),
        signature,
        urlPath: `/pledge/${props.pageAddress}`,
      });
      props.setShowRemoveModal(false);
    } catch (e: any) {
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
      title={getTitle(step)}
      showModal={props.showRemoveModal}
      onToggleModal={() => props.setShowRemoveModal(false)}
    >
      {step === "remove" && (
        <>
          <div className={styles.removeTitleContainer}>
            <span className={styles.lockIcon}>
              <LockOutlinedIcon fontSize="large" />
            </span>
            <Text t="body2">
              <Trans id="pledge.modal.unable_to_edit">
                Only Primary Wallet holders can edit the content of this pledge.
              </Trans>
            </Text>
          </div>
          <div className={styles.modalButtons}>
            <ButtonSecondary
              label={t({
                id: "pledge.modal.unpin_wallet",
                message: "unpin my wallet",
              })}
              variant="red"
              onClick={() => setStep("confirm")}
            />
            <ButtonSecondary
              label={t({ id: "shared.cancel", message: "Cancel" })}
              onClick={() => props.setShowRemoveModal(false)}
              variant="gray"
            />
          </div>
        </>
      )}

      {step === "confirm" && (
        <>
          <Text t="body2" className={styles.modalMessage}>
            <Trans id="pledge.modal.are_you_sure">
              Are you sure you want to remove your wallet from this pledge?
            </Trans>
          </Text>
          <div className={styles.modalButtons}>
            <ButtonPrimary
              label={t({
                id: "shared.remove",
                message: "remove",
              })}
              onClick={() =>
                handleSubmit({
                  message: removeSecondaryWallet(props.pledge.nonce),
                })
              }
              variant="red"
            />
            <ButtonSecondary
              label={t({ id: "shared.cancel", message: "Cancel" })}
              onClick={() => props.setShowRemoveModal(false)}
              variant="gray"
            />
          </div>
        </>
      )}
      {step === "error" && (
        <>
          <Text t="body2" className={styles.modalMessage}>
            {errorMessage ?? t({ message: "Error", id: "shared.error" })}
          </Text>
          <div className={styles.modalButtons}>
            <ButtonSecondary
              label={t({ id: "shared.okay", message: "Okay" })}
              onClick={() => {
                props.setShowRemoveModal(false);
              }}
            />
          </div>
        </>
      )}
      {step === "loading" && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </Modal>
  );
};
