import { t, Trans } from "@lingui/macro";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { Transaction } from "components/Transaction";
import { TransactionStatusMessage } from "lib/statusMessage";
import { CarbonmarkToken } from "lib/types/carbonmark";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

export interface Props {
  hasApproval: boolean;
  amount: {
    value: string;
    token: CarbonmarkToken;
  };
  isProcessing: boolean;
  status: TransactionStatusMessage | null;
  showModal: boolean;
  onModalClose?: () => void;
  handleApproval: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  onResetStatus: () => void;
}

const RetireApproval: FC = () => {
  return (
    <div className={styles.formatParagraph}>
      <Text t="body1" color="lighter">
        <Trans id="retire.approval_1">
          You are about to retire a carbon asset.
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans id="retire.approval_2">
          The first step is to grant the approval to transfer your payment asset
          from your wallet to Carbonmark, the next step is to approve the actual
          transfer and complete your retire.
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans id="retire.approval_3">
          Carbon assets you retire can be listed for sale on Carbonmark at any
          time from your{" "}
          <Link href="/portfolio" target="blank">
            portfolio
          </Link>
          .
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans id="retire.approval_4">
          Verify all information is correct and click 'approve' to continue.
        </Trans>
      </Text>
    </div>
  );
};

const RetireSubmit: FC = () => {
  return (
    <div className={styles.formatParagraph}>
      <Text t="body1" color="lighter">
        <Trans id="retire.submit_1">
          The previous step granted the approval to transfer your payment asset
          from your wallet to Carbonmark.
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans id="retire.submit_2">
          Your retirement has not been completed yet. To finalize your
          retirement, verify all information is correct and then click 'submit'
          below.
        </Trans>
      </Text>
    </div>
  );
};

export const RetireModal: FC<Props> = (props) => {
  return (
    <Modal
      title={
        !props.isProcessing
          ? t({
              id: "retire.transaction.modal.title.confirm",
              message: "Confirm retire",
            })
          : t({
              id: "retire.transaction.modal.title.processing",
              message: "Processing retire",
            })
      }
      showModal={props.showModal}
      onToggleModal={props.onModalClose}
    >
      {!props.isProcessing && (
        <Transaction
          hasApproval={props.hasApproval}
          amount={props.amount}
          approvalText={<RetireApproval />}
          submitText={<RetireSubmit />}
          onApproval={props.handleApproval}
          onSubmit={props.onSubmit}
          onCancel={props.onCancel}
          status={props.status}
          onResetStatus={props.onResetStatus}
        />
      )}
      {props.isProcessing && (
        <div className={styles.spinnerWrap}>
          <Spinner />
        </div>
      )}
    </Modal>
  );
};
