import { ButtonPrimary } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { LargeSpinner } from "components/LargeSpinner";
import { Modal } from "components/Modal";
import { Text } from "components/Text";
import { TransactionStatusMessage } from "lib/statusMessage";
import { StaticImageData } from "next/image";
import { FC, ReactNode, useEffect, useState } from "react";
import { Approve } from "./Approve";
import * as styles from "./styles";
import { Submit } from "./Submit";

interface Props {
  title: ReactNode;
  value: string;
  approvalValue?: string;
  tokenIcon: StaticImageData;
  tokenName: string;
  spenderAddress: string;
  onCloseModal: () => void;
  onApproval: () => void;
  onSubmit: () => void;
  status: TransactionStatusMessage | null;
  onResetStatus: () => void;
  isApproved: boolean;
}

export const RetireModal: FC<Props> = (props) => {
  const [view, setView] = useState<"approve" | "submit">(
    props.isApproved ? "submit" : "approve"
  );
  const [processingRetirement, setProcessingRetirement] = useState(false);

  useEffect(() => {
    if (
      props.status?.statusType === "networkConfirmation" &&
      view === "submit"
    ) {
      setProcessingRetirement(true);
    }
  }, [props.status, view]);

  const statusType = props.status?.statusType;

  const isPending =
    statusType === "userConfirmation" || statusType === "networkConfirmation";

  const onModalClose = !isPending ? props.onCloseModal : undefined;

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
      onToggleModal={processingRetirement ? undefined : onModalClose}
    >
      {processingRetirement ? (
        <div className={styles.processingRetirement}>
          <LargeSpinner />
        </div>
      ) : (
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
              <Trans id="transaction_modal.view.approve.title">
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
              <Trans id="transaction_modal.view.submit.title">2. Submit</Trans>
            </button>
          </div>
          {view === "approve" && (
            <Approve
              value={props.approvalValue || props.value}
              tokenIcon={props.tokenIcon}
              tokenName={props.tokenName}
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
              value={props.value}
              tokenIcon={props.tokenIcon}
              tokenName={props.tokenName}
              spenderAddress={props.spenderAddress}
              onSubmit={props.onSubmit}
              onClose={props.onCloseModal}
              status={props.status}
            />
          )}
          <ButtonPrimary
            label={<Trans id="transaction_modal.go_back">Go Back</Trans>}
            className={styles.backButton}
            onClick={props.onCloseModal}
          />
        </div>
      )}
    </Modal>
  );
};
