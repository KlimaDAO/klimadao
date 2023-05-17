import { ButtonPrimary } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { LargeSpinner } from "components/LargeSpinner";
// import { Modal } from "components/Modal";
import { Text } from "@klimadao/lib/components";
import { Modal } from "components/shared/Modal";
import { Transaction } from "components/Transaction";
import { TransactionStatusMessage } from "lib/statusMessage";
import { CarbonmarkToken } from "lib/types/carbonmark";
import { StaticImageData } from "next/image";
import { FC, ReactNode, useEffect, useState } from "react";
import * as styles from "./styles";

interface Props {
  title: ReactNode;
  value: string;
  approvalValue: string;
  tokenIcon: StaticImageData;
  tokenName: CarbonmarkToken;
  spenderAddress: string;
  onCloseModal: () => void;
  onApproval: () => void;
  onSubmit: () => void;
  status: TransactionStatusMessage | null;
  setStatus: (status: TransactionStatusMessage | null) => void;
  onResetStatus: () => void;
  isApproved: boolean;
  showModal: boolean;
}

export const RetireModal: FC<Props> = (props) => {
  const [txnView, setTxnView] = useState<"approve" | "submit">(
    props.isApproved ? "submit" : "approve"
  );

  const [processingRetirement, setProcessingRetirement] = useState(false);

  useEffect(() => {
    if (
      props.status?.statusType === "networkConfirmation" &&
      txnView === "submit"
    ) {
      setProcessingRetirement(true);
    }
  }, [props.status, txnView]);

  const statusType = props.status?.statusType;

  const isPending =
    statusType === "userConfirmation" || statusType === "networkConfirmation";

  const onModalClose = !isPending ? props.onCloseModal : undefined;

  const RetireApproval = () => {
    return (
      <div className={styles.formatParagraph}>
        <Text t="caption">
          <Trans id="transaction_modal.approve.allow_amount_1">
            The first step is to grant the approval to transfer your carbon
            asset from your wallet to Carbonmark.
          </Trans>
        </Text>
        <Text t="caption">
          <Trans id="transaction_modal.approve.allow_amount_2">
            The next step is to approve the actual transfer and complete your
            retirement.
          </Trans>
        </Text>{" "}
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
            The previous step granted the approval to transfer your carbon asset
            from your wallet to Carbonmark, your retirement has not been
            completed yet.
          </Trans>
        </Text>
      </div>
    );
  };

  return (
    <Modal
      title={
        processingRetirement ? (
          <div className={styles.processingRetirement}>
            <Text t="h3">Processing Retirement</Text>
          </div>
        ) : (
          props.title
        )
      }
      showModal={true}
      onToggleModal={processingRetirement ? undefined : onModalClose}
    >
      {processingRetirement ? (
        <div className={styles.processingRetirement}>
          <LargeSpinner />
        </div>
      ) : (
        <Transaction
          hasApproval={props.isApproved}
          amount={{
            value: props.value,
            token: props.tokenName,
          }}
          price={{
            value: props.approvalValue,
            token: props.tokenName,
          }}
          spenderAddress={props.spenderAddress}
          onApproval={props.onApproval}
          onSubmit={props.onSubmit}
          onCancel={props.onCloseModal}
          status={props.status}
          onResetStatus={props.onResetStatus}
          approvalText={<RetireApproval />}
          submitText={<RetireSubmit />}
          onViewChange={setTxnView}
          onGoBack={() => {
            props.setStatus(null);
          }}
        />
      )}
      {(props.status?.statusType && props.status?.statusType !== "error") ||
      processingRetirement ? null : (
        <ButtonPrimary
          label={<Trans id="transaction_modal.go_back">Go Back</Trans>}
          className={styles.backButton}
          onClick={() => {
            props.onCloseModal();
            props.setStatus(null);
          }}
        />
      )}
    </Modal>
  );
};
