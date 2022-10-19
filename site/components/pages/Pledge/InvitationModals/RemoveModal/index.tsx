import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ButtonPrimary, ButtonSecondary, Text } from "@klimadao/lib/components";
import { Modal } from "components/Modal";
import * as styles from "../../PledgeDashboard/styles";
import { t, Trans } from "@lingui/macro";
import { removeSecondaryWallet } from "../../lib/editPledgeSignature";

type Props = {
  setShowRemoveModal: (value: boolean) => void;
  showRemoveModal: boolean;
  handleSubmit: (params: { message: (nonce: string) => string }) => void;
};

export const RemoveModal = (props: Props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <>
      <Modal
        title={t({ id: "pledge.modal.edit_pledge", message: "Edit pledge" })}
        showModal={props.showRemoveModal}
        onToggleModal={() => props.setShowRemoveModal(false)}
      >
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
              setShowConfirmModal(true);
              props.setShowRemoveModal(false);
            }}
          />
          <ButtonSecondary
            label={t({ id: "shared.cancel", message: "Cancel" })}
            onClick={() => props.setShowRemoveModal(false)}
            variant="gray"
          />
        </div>
      </Modal>
      <Modal
        title={t({
          id: "pledge.modal.confirm_remove",
          message: "Confirm Removal",
        })}
        showModal={showConfirmModal}
        onToggleModal={() => setShowConfirmModal(false)}
      >
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
              props.handleSubmit({
                message: removeSecondaryWallet,
              });
              setShowConfirmModal(false);
            }}
            variant="red"
          />
          <ButtonSecondary
            label={t({ id: "shared.cancel", message: "Cancel" })}
            onClick={() => props.setShowRemoveModal(false)}
            variant="gray"
          />
        </div>
      </Modal>
    </>
  );
};
