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
import {
  putPledge,
  pledgeFormAdapter,
  waitForGnosisSignature,
} from "../../lib";
import { getErrorMessage } from "../../PledgeForm";

type Props = {
  setShowRemoveModal: (value: boolean) => void;
  showRemoveModal: boolean;
  pledge: Pledge;
  pageAddress: string;
};

type Step = "remove" | "confirm" | "error" | "loading" | "signing";

export const RemoveModal = (props: Props) => {
  const [step, setStep] = useState<Step>("remove");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      signing: t({
        id: "pledge.invitation.signing",
        message: "Signing",
      }),
    }[step]);

  const { signer, address } = useWeb3();
  const handleSubmit = async (params: { message: string }) => {
    try {
      if (!signer) return;
      setStep("signing");
      const signature = await signer.signMessage(params.message);
      setStep("loading");
      if (signature === "0x") {
        await waitForGnosisSignature({
          message: params.message,
          address: props.pageAddress,
        });
      }
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
      console.log("error:", e);
      setErrorMessage(getErrorMessage(e.name));
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
      {step === "signing" && (
        <div className={styles.signingContainer}>
          <div className={styles.spinnerContainer}>
            <Spinner />
            <Text t="caption" className={styles.signatureTitle}>
              <Trans id="pledge.invitations.awaiting_signature">
                Awaiting Signature...
              </Trans>
            </Text>
          </div>
          <Text t="caption">
            <Trans id="pledge.invitations.signature_instructions">
              Use your wallet to sign and confirm this edit.
            </Trans>
          </Text>
        </div>
      )}
    </Modal>
  );
};
