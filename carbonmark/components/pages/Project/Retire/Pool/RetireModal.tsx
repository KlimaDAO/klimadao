import { t, Trans } from "@lingui/macro";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { Transaction } from "components/Transaction";
import { getAddress } from "lib/networkAware/getAddress";
import { TransactionStatusMessage } from "lib/statusMessage";
import { FC } from "react";
import * as styles from "./styles";

export interface Props {
  hasApproval: boolean;
  amount: string;
  approvalValue?: string;
  isProcessing: boolean;
  status: TransactionStatusMessage | null;
  showModal: boolean;
  onModalClose?: () => void;
  handleApproval: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  onResetStatus: () => void;
  successScreen?: React.ReactNode;
  showSuccessScreen: boolean;
}

const RetireApproval: FC = () => {
  return (
    <div className={styles.formatParagraph}>
      <Text>
        <Trans>You are about to retire a carbon asset.</Trans>
      </Text>
      <Text>
        <Trans>
          The first step is to grant the approval to transfer your carbon asset
          from your wallet to Carbonmark, the next step is to approve the actual
          transfer and complete your retirement.
        </Trans>
      </Text>
      <Text>
        <Trans>
          Verify all information is correct and click 'approve' to continue.{" "}
        </Trans>
      </Text>
    </div>
  );
};

const RetireSubmit: FC = () => {
  return (
    <div className={styles.formatParagraph}>
      <Text>
        <Trans>
          The previous step granted the approval to transfer your carbon asset
          from your wallet to Carbonmark, your retirement has not been completed
          yet.
        </Trans>
      </Text>
      <Text>
        <Trans>
          To finalize your retirement, verify all information is correct and
          then click 'submit' below.
        </Trans>
      </Text>
    </div>
  );
};

export const RetireModal: FC<Props> = (props) => {
  const showTransaction = !props.isProcessing && !props.showSuccessScreen;
  const showSuccessScreen = !props.isProcessing && props.showSuccessScreen;
  const title =
    (props.isProcessing && t`Processing Retirement`) ||
    (showSuccessScreen && t`Retirement successful`) ||
    t`Confirm Retirement`;
  return (
    <Modal
      title={title}
      showModal={props.showModal}
      onToggleModal={props.onModalClose}
    >
      {showTransaction && (
        <Transaction
          hasApproval={props.hasApproval}
          amount={props.amount}
          approvalValue={props.approvalValue}
          approvalText={<RetireApproval />}
          submitText={<RetireSubmit />}
          onApproval={props.handleApproval}
          onSubmit={props.onSubmit}
          onCancel={props.onCancel}
          status={props.status}
          onGoBack={props.onCancel}
          onResetStatus={props.onResetStatus}
          spenderAddress={getAddress("retirementAggregatorV2")}
        />
      )}

      {props.isProcessing && (
        <div className={styles.spinnerWrap}>
          <Spinner />
        </div>
      )}

      {showSuccessScreen && props.successScreen}
    </Modal>
  );
};
