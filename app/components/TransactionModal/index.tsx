import { FC, ReactNode, useState } from "react";
import { Trans } from "@lingui/macro";
import { AppNotificationStatus } from "state/app";
import {
  AllowancesToken,
  AllowancesSpender,
} from "@klimadao/lib/types/allowances";

import { Modal } from "components/Modal";
import { Approve } from "./Approve";
import { Submit } from "./Submit";

import * as styles from "./styles";

interface Props {
  title: ReactNode;
  value: string;
  token: AllowancesToken;
  spender: AllowancesSpender;
  onCloseModal: () => void;
  onApproval: () => void;
  onSubmit: () => void;
  status: AppNotificationStatus | null;
  onResetStatus: () => void;
  hasApproval: boolean;
}

export const TransactionModal: FC<Props> = (props) => {
  const [view, setView] = useState<"approve" | "submit">(
    props.hasApproval ? "submit" : "approve"
  );

  const statusType = props.status?.statusType;
  const isPending =
    statusType === "userConfirmation" || statusType === "networkConfirmation";

  const onModalClose = !isPending ? props.onCloseModal : undefined;

  return (
    <Modal title={props.title} onToggleModal={onModalClose}>
      <div className={styles.container}>
        <div className={styles.viewSwitch}>
          <button
            className={styles.switchButton}
            onClick={() => {
              setView("approve");
            }}
            data-active={view === "approve"}
            disabled={view === "submit" || isPending}
          >
            <Trans id="transaction_modal.view.approve.title">1. Approve</Trans>
          </button>
          <button
            className={styles.switchButton}
            onClick={() => {
              setView("submit");
            }}
            data-active={view === "submit"}
            disabled={view === "approve" || isPending}
          >
            <Trans id="transaction_modal.view.submit.title">2. Submit</Trans>
          </button>
        </div>
        {view === "approve" && (
          <Approve
            value={props.value}
            token={props.token}
            spender={props.spender}
            onApproval={props.onApproval}
            onSuccess={() => {
              props.onResetStatus();
              setView("submit");
            }}
            status={props.status}
          />
        )}
        {view === "submit" && (
          <Submit
            value={props.value}
            token={props.token}
            spender={props.spender}
            onSubmit={props.onSubmit}
            onClose={props.onCloseModal}
            status={props.status}
          />
        )}
      </div>
    </Modal>
  );
};
