import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { Transaction } from "components/Transaction";
import { getAddress } from "lib/networkAware/getAddress";
import { TransactionStatusMessage } from "lib/statusMessage";
import Link from "next/link";
import { FC } from "react";
import * as styles from "../styles";

export interface Props {
  hasApproval: boolean;
  amount: string;
  isProcessing: boolean;
  status: TransactionStatusMessage | null;
  showModal: boolean;
  onModalClose?: () => void;
  handleApproval: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  onResetStatus: () => void;
}

const PurchaseApproval: FC = () => {
  return (
    <div className={styles.formatParagraph}>
      <Text t="body1" color="lighter">
        <Trans id="purchase.approval_1">
          You are about to purchase a carbon asset.
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans id="purchase.approval_2">
          The first step is to grant the approval to transfer your payment asset
          from your wallet to Carbonmark, the next step is to approve the actual
          transfer and complete your purchase.
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans id="purchase.approval_3">
          Carbon assets you purchase can be listed for sale on Carbonmark at any
          time from your{" "}
          <Link href="/portfolio" target="blank">
            portfolio
          </Link>
          .
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans id="purchase.approval_4">
          Verify all information is correct and click 'approve' to continue.
        </Trans>
      </Text>
    </div>
  );
};

const PurchaseSubmit: FC = () => {
  return (
    <div className={styles.formatParagraph}>
      <Text t="body1" color="lighter">
        <Trans id="purchase.submit_1">
          The previous step granted the approval to transfer your payment asset
          from your wallet to Carbonmark.
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans id="purchase.submit_2">
          Your purchase has not been completed yet. To finalize your purchase,
          verify all information is correct and then click 'submit' below.
        </Trans>
      </Text>
    </div>
  );
};

export const PurchaseModal: FC<Props> = (props) => {
  const { networkLabel } = useWeb3();
  return (
    <Modal
      title={!props.isProcessing ? t`Confirm Purchase` : t`Processing Purchase`}
      showModal={props.showModal}
      onToggleModal={props.onModalClose}
    >
      {!props.isProcessing && (
        <Transaction
          hasApproval={props.hasApproval}
          amount={props.amount}
          approvalText={<PurchaseApproval />}
          submitText={<PurchaseSubmit />}
          onApproval={props.handleApproval}
          onSubmit={props.onSubmit}
          onCancel={props.onCancel}
          status={props.status}
          onResetStatus={props.onResetStatus}
          spenderAddress={getAddress("carbonmark", networkLabel)}
          onGoBack={props.onCancel}
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
