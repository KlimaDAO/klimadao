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
  setShowAcceptModal: (value: boolean) => void;
  showAcceptModal: boolean;
  pledge: Pledge;
  pageAddress: string;
};

export const AcceptModal = (props: Props) => {
  const [status, setStatus] = useState<"accept" | "confirm" | "error">(
    "accept"
  );
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
      props.setShowAcceptModal(false);
    } catch {
      console.log("uh ohhh");
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
              {concatAddress(props.pledge.ownerAddress)} has invited you to add
              your wallet to this pledge. If you accept, then your carbon
              retirements will count toward{" "}
              {concatAddress(props.pledge.ownerAddress)}'s pledge. You may
              remove your wallet from this pledge at any time.
            </Trans>
          </Text>
          <div className={styles.modalButtons}>
            <ButtonPrimary
              label={t({
                id: "pledge.invitation.accept",
                message: "Accept Invitation",
              })}
              onClick={() => {
                setStatus("confirm");
              }}
            />
            <ButtonSecondary
              label={t({
                id: "pledge.invitation.reject",
                message: "Reject Invitation",
              })}
              onClick={() => {
                handleSubmit({
                  message: removeSecondaryWallet,
                });
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
        </>
      )}
      {status === "confirm" && (
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
                setStatus("accept");
              }}
              variant="gray"
            />
          </div>
        </>
      )}
    </Modal>
  );
};
