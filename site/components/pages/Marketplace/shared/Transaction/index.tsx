import { FC, useState } from "react";
import { Trans } from "@lingui/macro";

import { Approve } from "./Approve";
import { Submit } from "./Submit";
import {
  TransactionStatusMessage,
  getMarketplaceAddress,
  MarketplaceToken,
} from "./lib";

import * as styles from "./styles";

interface Props {
  value: string;
  approvalValue?: string;
  token: MarketplaceToken;
  onApproval: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  status: TransactionStatusMessage | null;
  onResetStatus: () => void;
  hasApproval: boolean;
}

export const Transaction: FC<Props> = (props) => {
  const [view, setView] = useState<"approve" | "submit">(
    props.hasApproval ? "submit" : "approve"
  );

  const statusType = props.status?.statusType;
  const isPending =
    statusType === "userConfirmation" || statusType === "networkConfirmation";

  return (
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
          <Trans id="marketplace.transaction_modal.view.approve.title">
            1. Approve
          </Trans>
        </button>
        <button
          className={styles.switchButton}
          onClick={() => {
            setView("submit");
          }}
          data-active={view === "submit"}
          disabled={view === "approve" || isPending}
        >
          <Trans id="marketplace.transaction_modal.view.submit.title">
            2. Submit
          </Trans>
        </button>
      </div>
      {view === "approve" && (
        <Approve
          value={props.approvalValue || props.value}
          token={props.token}
          spenderAddress={getMarketplaceAddress()}
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
          spenderAddress={getMarketplaceAddress()}
          onSubmit={props.onSubmit}
          onClose={props.onCancel}
          status={props.status}
        />
      )}
    </div>
  );
};
