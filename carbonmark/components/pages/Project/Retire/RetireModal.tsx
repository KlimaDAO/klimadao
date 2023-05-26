import { t, Trans } from "@lingui/macro";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { Transaction } from "components/Transaction";
import { TransactionStatusMessage } from "lib/statusMessage";
import { CarbonmarkToken } from "lib/types/carbonmark";
import { FC } from "react";
import * as styles from "./styles";

export interface Props {
  hasApproval: boolean;
  amount: {
    value: string;
    token: CarbonmarkToken;
  };
  approvalValue?: {
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
  successScreen?: React.ReactNode;
  showSuccessScreen: boolean;
}

const RetireApproval: FC = () => {
  return (
    <div className={styles.formatParagraph}>
      <Text t="body1" color="lighter">
        <Trans>You are about to retire a carbon asset from a pool.</Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans>here we can say more about this.</Trans>
      </Text>
      <Text t="body4" color="lighter">
        <Trans>
          The approval amount below adds an extra 1% due to volatile transaction
          fees.
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans>We need more text here</Trans>
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
          from your wallet.
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
          onResetStatus={props.onResetStatus}
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
