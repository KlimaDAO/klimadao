import { t, Trans } from "@lingui/macro";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { Transaction } from "components/Transaction";
import { getAddress } from "lib/networkAware/getAddress";
import { TransactionStatusMessage } from "lib/statusMessage";
import { CarbonmarkToken } from "lib/types/carbonmark";
import Link from "next/link";
import { FC } from "react";
import * as styles from "../styles";

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
  successScreen?: React.ReactNode;
  showSuccessScreen: boolean;
}

const PurchaseApproval: FC = () => {
  return (
    <div className={styles.formatParagraph}>
      <Text t="body1" color="lighter">
        <Trans>You are about to purchase a carbon asset.</Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans>
          The first step is to grant the approval to transfer your payment asset
          from your wallet to Carbonmark, the next step is to approve the actual
          transfer and complete your purchase.
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans>
          Carbon assets you purchase can be listed for sale on Carbonmark at any
          time from your{" "}
          <Link href="/portfolio" target="blank">
            portfolio
          </Link>
          .
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans>
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
        <Trans>
          The previous step granted the approval to transfer your payment asset
          from your wallet to Carbonmark.
        </Trans>
      </Text>
      <Text t="body1" color="lighter">
        <Trans>
          Your purchase has not been completed yet. To finalize your purchase,
          verify all information is correct and then click 'submit' below.
        </Trans>
      </Text>
    </div>
  );
};

export const PurchaseModal: FC<Props> = (props) => {
  const showTransaction = !props.isProcessing && !props.showSuccessScreen;
  const showSuccessScreen = !props.isProcessing && props.showSuccessScreen;
  const title =
    (props.isProcessing && t`Processing Purchase`) ||
    (showSuccessScreen && t`Purchase successful`) ||
    t`Confirm Purchase`;

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
          approvalText={<PurchaseApproval />}
          submitText={<PurchaseSubmit />}
          onApproval={props.handleApproval}
          onSubmit={props.onSubmit}
          onCancel={props.onCancel}
          status={props.status}
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
