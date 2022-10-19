import React, { useState } from "react";

import { ButtonPrimary, ButtonSecondary, Text } from "@klimadao/lib/components";
import { Modal } from "components/Modal";
import * as styles from "../../PledgeDashboard/styles";
import { t, Trans } from "@lingui/macro";
import {
  approveSecondaryWallet,
  removeSecondaryWallet,
} from "../../lib/editPledgeSignature";
import { concatAddress } from "@klimadao/lib/utils";
import { Pledge } from "../../types";

type Props = {
  setShowAcceptModal: (value: boolean) => void;
  showAcceptModal: boolean;
  pledge: Pledge;
  handleSubmit: (params: { message: (nonce: string) => string }) => void;
};

export const AcceptModal = (props: Props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <>
      <Modal
        title="Invitation to join"
        showModal={props.showAcceptModal}
        onToggleModal={() => props.setShowAcceptModal(false)}
      >
        <Text className={styles.modalMessage} t="body2">
          <Trans id="pledge.invitation.join_message">
            {concatAddress(props.pledge.ownerAddress)} has invited you to add
            your wallet to this pledge. If you accept, then your carbon
            retirements will count toward{" "}
            {concatAddress(props.pledge.ownerAddress)}'s pledge. You may remove
            your wallet from this pledge at any time.
          </Trans>
        </Text>
        <div className={styles.modalButtons}>
          <ButtonPrimary
            label={t({
              id: "pledge.invitation.accept",
              message: "Accept Invitation",
            })}
            onClick={() => {
              setShowConfirmModal(true);
              props.setShowAcceptModal(false);
            }}
          />
          <ButtonSecondary
            label={t({
              id: "pledge.invitation.reject",
              message: "Reject Invitation",
            })}
            onClick={() => {
              props.handleSubmit({
                message: removeSecondaryWallet,
              });
              props.setShowAcceptModal(false);
            }}
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
      </Modal>
      <Modal
        title={t({ id: "", message: "Are you sure?" })}
        showModal={showConfirmModal}
        onToggleModal={() => setShowConfirmModal(false)}
      >
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
              props.handleSubmit({
                message: approveSecondaryWallet,
              });
              setShowConfirmModal(false);
            }}
          />
          <ButtonSecondary
            label={t({ id: "shared.cancel", message: "Cancel" })}
            onClick={() => {
              setShowConfirmModal(false);
              props.setShowAcceptModal(true);
            }}
            variant="gray"
          />
        </div>
      </Modal>
    </>
  );
};
