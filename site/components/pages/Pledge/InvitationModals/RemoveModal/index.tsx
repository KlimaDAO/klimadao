import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ButtonPrimary, ButtonSecondary, Text } from "@klimadao/lib/components";
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

export const RemoveModal = (props: Props) => {
  const [status, setStatus] = useState<"remove" | "confirm" | "error">(
    "remove"
  );
  const getTitle = (status: string) =>
    ({
      remove: t({ id: "pledge.modal.edit_pledge", message: "Edit pledge" }),
      confirm: t({
        id: "pledge.modal.confirm_remove",
        message: "Confirm Removal",
      }),
    }[status]);
  const { signer } = useWeb3();
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
      setStatus("error");
      setErrorMessage(
        e.message ??
          "Something went wrong on our end. Please try again in a few minutes"
      );
      console.log("error:", e);
      console.log("uh ohhh");
    }
  };
  return (
    <Modal
      title={getTitle(status)}
      showModal={props.showRemoveModal}
      onToggleModal={() => props.setShowRemoveModal(false)}
    >
      {status === "remove" && (
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
              onClick={() => {
                setStatus("confirm");
              }}
            />
            <ButtonSecondary
              label={t({ id: "shared.cancel", message: "Cancel" })}
              onClick={() => props.setShowRemoveModal(false)}
              variant="gray"
            />
          </div>
        </>
      )}
      {status === "confirm" && (
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
              onClick={() => {
                handleSubmit({
                  message: removeSecondaryWallet,
                });
              }}
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
    </Modal>
  );
};
