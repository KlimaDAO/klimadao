import { Trans } from "@lingui/macro";
import { FC, useState } from "react";

import { MarketplaceButton } from "components/MarketplaceButton";
import { getMarketplaceAddress } from "lib/getAddresses";
import { TransactionStatusMessage } from "lib/statusMessage";
import { Approve } from "./Approve";
import { Submit } from "./Submit";

import { Value } from "./types";

import * as styles from "./styles";

interface Props {
  hasApproval: boolean;
  amount: Value;
  price?: Value;
  onApproval: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  status: TransactionStatusMessage | null;
  onResetStatus: () => void;
  approvalText?: string;
  submitText?: string;
  onGoBack?: () => void;
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
          amount={props.amount}
          price={props.price}
          description={props.approvalText}
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
          amount={props.amount}
          price={props.price}
          description={props.submitText}
          spenderAddress={getMarketplaceAddress()}
          onSubmit={props.onSubmit}
          onClose={props.onCancel}
          status={props.status}
        />
      )}
      {!!props.onGoBack && (
        <MarketplaceButton
          label={<Trans id="transaction_modal.button.go_back">Go back</Trans>}
          disabled={isPending}
          onClick={props.onGoBack}
        />
      )}
    </div>
  );
};
