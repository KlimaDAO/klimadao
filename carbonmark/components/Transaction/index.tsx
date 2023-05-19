import { Trans } from "@lingui/macro";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { TransactionStatusMessage } from "lib/statusMessage";
import { StaticImageData } from "next/image";
import { FC, useEffect, useState } from "react";
import { Approve } from "./Approve";
import * as styles from "./styles";
import { Submit } from "./Submit";
import { Value } from "./types";

interface Props {
  hasApproval: boolean;
  amount: Value;
  price?: Value;
  onApproval: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  status: TransactionStatusMessage | null;
  onResetStatus: () => void;
  approvalText?: React.ReactNode;
  submitText?: React.ReactNode;
  onGoBack?: () => void;
  spenderAddress: string;
  tokenIcon?: StaticImageData;
  tokenName?: string;
  onViewChange?: (newView: "approve" | "submit") => void;
  showPrice?: boolean;
}

export const Transaction: FC<Props> = (props) => {
  const [view, setView] = useState<"approve" | "submit">(
    props.hasApproval ? "submit" : "approve"
  );
  const statusType = props.status?.statusType;
  const isPending =
    statusType === "userConfirmation" || statusType === "networkConfirmation";

  useEffect(() => {
    props.onViewChange?.(view);
  }, [view, props]);

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
          amount={props.amount}
          price={props.price}
          description={props.submitText}
          spenderAddress={props.spenderAddress}
          onSubmit={props.onSubmit}
          onClose={props.onCancel}
          status={props.status}
        />
      )}
      {!!props.onGoBack && (
        <CarbonmarkButton
          label={<Trans id="transaction_modal.button.go_back">Go back</Trans>}
          disabled={isPending}
          onClick={props.onGoBack}
        />
      )}
    </div>
  );
};
