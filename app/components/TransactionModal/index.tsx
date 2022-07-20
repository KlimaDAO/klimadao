import { FC, ReactNode, useState, useEffect } from "react";
import { Trans } from "@lingui/macro";
import { AppNotificationStatus } from "state/app";
import {
  AllowancesToken,
  AllowancesSpender,
} from "@klimadao/lib/types/allowances";

import { Modal } from "components/Modal";
import { Approve } from "./Approve";
import { Submit } from "./Submit";
import { Spinner } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Props {
  title: ReactNode;
  value: string;
  token: AllowancesToken;
  spender: AllowancesSpender;
  onCloseModal: () => void;
  onApproval: () => void;
  onSubmit: () => void;
  status?: AppNotificationStatus | null;
  hasApproval: boolean;
}

export const TransactionModal: FC<Props> = (props) => {
  const [view, setView] = useState<"approve" | "submit">("approve");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.hasApproval) {
      setView("submit");
    }
    setIsLoading(false);
  }, []);

  return (
    <Modal title={props.title} onToggleModal={props.onCloseModal}>
      <div className={styles.container}>
        <div className={styles.viewSwitch}>
          <button
            className={styles.switchButton}
            onClick={() => {
              setView("approve");
            }}
            data-active={view === "approve"}
            disabled={isLoading}
          >
            1. <Trans id="transaction_modal.approve.title">Approve</Trans>
          </button>
          <button
            className={styles.switchButton}
            onClick={() => {
              setView("submit");
            }}
            data-active={view === "submit"}
            disabled={isLoading || view === "approve"}
          >
            2. <Trans id="transaction_modal.approve.title">Submit</Trans>
          </button>
        </div>
        {isLoading && (
          <div className={styles.spinner_container}>
            <Spinner />
          </div>
        )}
        {!isLoading && view === "approve" && (
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
        {!isLoading && view === "submit" && (
          <Submit
            value={props.value}
            token={props.token}
            spender={props.spender}
            onSubmit={props.onSubmit}
            onSuccess={props.onCloseModal}
            status={props.status}
          />
        )}
      </div>
    </Modal>
  );
};
