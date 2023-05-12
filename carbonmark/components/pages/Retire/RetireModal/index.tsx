import { Trans } from "@lingui/macro";
import { TransactionStatusMessage } from "lib/statusMessage";
import { FC, ReactNode, useState } from "react";

import { Modal } from "components/Modal";
import { Approve } from "./Approve";
import { Submit } from "./Submit";

import * as styles from "./styles";

interface Props {
  title: ReactNode;
  value: string;
  approvalValue?: string;
  tokenName: string;
  spenderAddress: string;
  onCloseModal: () => void;
  onApproval: () => void;
  onSubmit: () => void;
  status: TransactionStatusMessage | null;
  onResetStatus: () => void;
  isApproved: boolean;
}

export const RetireModal: FC<Props> = (props) => {
  const [view, setView] = useState<"approve" | "submit">(
    props.isApproved ? "submit" : "approve"
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
            value={props.approvalValue || props.value}
            // tokenIcon={props.tokenIcon}
            tokenName={props.tokenName}
            spenderAddress={props.spenderAddress}
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
            // tokenIcon={props.tokenIcon}
            tokenName={props.tokenName}
            spenderAddress={props.spenderAddress}
            onSubmit={props.onSubmit}
            onClose={props.onCloseModal}
            status={props.status}
          />
        )}
      </div>
    </Modal>
  );
};
