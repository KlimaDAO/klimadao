import React, { useState } from "react";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary, ButtonSecondary, Text } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Modal } from "components/Modal";
import { Pledge } from "../../types";
import { removeSecondaryWallet } from "../../lib/editPledgeMessage";
import { putPledge, pledgeFormAdapter } from "../../lib";
import * as styles from "../../PledgeDashboard/styles";

type Props = {
  pageAddress: string;
  pledge: Pledge;
  setShowRemoveModal: (value: boolean) => void;
  showRemoveModal: boolean;
};

const getTitle = (step: string) =>
  ({
    remove: t({ id: "pledge.modal.edit_pledge", message: "Edit pledge" }),
    confirm: t({
      id: "pledge.modal.confirm_remove",
      message: "Confirm Removal",
    }),
  }[step]);

type Steps = "remove" | "confirm" | "error";

export const RemoveModal = (props: Props) => {
  const { signer } = useWeb3();
  const [step, setStep] = useState<Steps>("remove");

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

      props.setShowRemoveModal(false);
    } catch {
      console.log("uh ohhh");
      setStep("error");
    }
  };

  return (
    <Modal
      title={getTitle(step)}
      showModal={true}
      // showModal={props.showRemoveModal}
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
                  message: removeSecondaryWallet,
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
        // show error
        <>Error</>
      )}
    </Modal>
  );
};
