import { Trans, t } from "@lingui/macro";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { formatAllowanceDisplay } from "lib/formatAllowanceDisplay";
import { TransactionStatusMessage } from "lib/statusMessage";
import { FC, useState } from "react";
import { Approve } from "./Approve";
import { Submit } from "./Submit";
import * as styles from "./styles";
import { Value } from "./types";
interface Props {
  /** If the seller has already approved the required allowance */
  hasApproval: boolean;
  /** Price per unit */
  price?: Value;
  onApproval: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  status: TransactionStatusMessage | null;
  onResetStatus: () => void;
  onGoBack: () => void;
  /** Total allowance needed to create this listing (sum of similar listings + new listing) */
  allowance: string;
  /** Quantity to list for */
  quantity: string;
  isERC1155: boolean;
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
          amount={t`${formatAllowanceDisplay(props.allowance)}`}
          onApproval={props.onApproval}
          onSuccess={() => {
            props.onResetStatus();
            setView("submit");
          }}
          isERC1155={props.isERC1155}
          status={props.status}
        />
      )}
      {view === "submit" && (
        <Submit
          amount={props.quantity}
          price={props.price}
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
