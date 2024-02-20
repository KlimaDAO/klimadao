import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { Transaction } from "components/Transaction";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { TransactionStatusMessage } from "lib/statusMessage";
import { CarbonmarkToken } from "lib/types/carbonmark.types";
import { StaticImageData } from "next/image";
import { FC, ReactNode } from "react";
import * as styles from "./styles";

interface Props {
  title: ReactNode;
  value: string;
  token: {
    key: string;
    icon: StaticImageData;
    label: Uppercase<CarbonmarkToken> | "USDC.e";
  };
  spenderAddress: string;
  onCloseModal: () => void;
  onApproval: () => void;
  onSubmit: () => void;
  status: TransactionStatusMessage | null;
  setStatus: (status: TransactionStatusMessage | null) => void;
  onResetStatus: () => void;
  isApproved: boolean;
  showModal: boolean;
  processingRetirement: boolean;
  setProcessingRetirement: (processingRetirement: boolean) => void;
}

export const RetireModal: FC<Props> = (props) => {
  const { processingRetirement, setProcessingRetirement } = props;

  const statusType = props.status?.statusType;

  const onSubmit = () => {
    setProcessingRetirement(true);
    props.onSubmit();
  };

  const isPending =
    statusType === "userConfirmation" || statusType === "networkConfirmation";

  const onModalClose = !isPending ? props.onCloseModal : undefined;

  const RetireApproval = () => {
    return (
      <div className={styles.formatParagraph}>
        <Text t="caption">
          <Trans id="transaction_modal.approve.allow_amount_1">
            You are about to retire a carbon asset.
          </Trans>
        </Text>
        <Text t="caption">
          <Trans id="transaction_modal.approve.allow_amount_2">
            The first step is to grant the approval to transfer your carbon
            asset from your wallet to Carbonmark, the next step is to approve
            the actual transfer and complete your retirement.
          </Trans>
        </Text>
        <Text t="caption">
          <Trans id="transaction_modal.approve.allow_amount_3">
            Verify all information is correct and click 'approve' to continue.{" "}
          </Trans>
        </Text>
      </div>
    );
  };

  const RetireSubmit = () => {
    return (
      <div className={styles.formatParagraph}>
        <Text t="caption">
          <Trans id="transaction_modal.submit.confirm_transaction_1">
            The previous step granted the approval to transfer your carbon asset
            from your wallet to Carbonmark, your retirement has not been
            completed yet.
          </Trans>
        </Text>
        <Text t="caption">
          <Trans id="transaction_modal.submit.confirm_transaction_2">
            To finalize your retirement, verify all information is correct and
            then click 'submit' below.
          </Trans>
        </Text>
      </div>
    );
  };

  return (
    <Modal
      title={
        processingRetirement ? (
          <div>
            <Text className={styles.processingTitle} t="h3">
              Processing Retirement
            </Text>
          </div>
        ) : (
          props.title
        )
      }
      showModal={props.showModal}
      onToggleModal={processingRetirement ? undefined : onModalClose}
    >
      {processingRetirement ? (
        <div className={styles.processingRetirement}>
          <Spinner className={styles.processingSpinner} />
        </div>
      ) : (
        <Transaction
          hasApproval={props.isApproved}
          amount={props.value}
          spenderAddress={props.spenderAddress}
          onApproval={props.onApproval}
          onSubmit={onSubmit}
          onCancel={props.onCloseModal}
          status={props.status}
          onResetStatus={props.onResetStatus}
          approvalText={<RetireApproval />}
          submitText={<RetireSubmit />}
          onGoBack={() => {
            props.onCloseModal();
            props.setStatus(null);
          }}
        />
      )}
    </Modal>
  );
};
