import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { Spinner } from "components/shared/Spinner";
import { Transaction } from "components/Transaction";
import { TransactionStatusMessage } from "lib/statusMessage";
import { CarbonmarkToken } from "lib/types/carbonmark";
import { StaticImageData } from "next/image";
import { FC, ReactNode, useEffect, useState } from "react";
import { CustomizableModal } from "../CustomizableModal";
import * as styles from "./styles";

interface Props {
  title: ReactNode;
  value: string;
  approvalValue: string;
  token: {
    key: string;
    icon: StaticImageData;
    label: Uppercase<CarbonmarkToken>;
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
}

export const RetireModal: FC<Props> = (props) => {
  const [txnView, setTxnView] = useState<"approve" | "submit">(
    props.isApproved ? "submit" : "approve"
  );

  const [processingRetirement, setProcessingRetirement] = useState(false);

  const statusType = props.status?.statusType;

  useEffect(() => {
    setTxnView(props.isApproved ? "submit" : "approve");
  }, [props.isApproved]);

  useEffect(() => {
    if (statusType === "networkConfirmation" && txnView === "submit") {
      setProcessingRetirement(true);
    }
  }, [props.status, txnView]);

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
    <CustomizableModal
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
      maxWidth={processingRetirement ? "43rem" : "50rem"}
      height={processingRetirement ? "26rem" : "fit-content"}
      maxHeight="calc(100vh - 8rem)"
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
          amount={{
            value: props.value,
            token: props.token.key as CarbonmarkToken,
          }}
          spenderAddress={props.spenderAddress}
          onApproval={props.onApproval}
          onSubmit={props.onSubmit}
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
    </CustomizableModal>
  );
};
