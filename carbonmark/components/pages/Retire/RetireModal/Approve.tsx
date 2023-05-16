import { cx } from "@emotion/css";
import { concatAddress } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import CheckIcon from "@mui/icons-material/Check";
import { getStatusMessage, TransactionStatusMessage } from "lib/statusMessage";
// import { StaticImageData } from "next/image";
import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import { StaticImageData } from "next/image";
import { FC } from "react";
import { RetireValue } from "./RetireValues";

import { urls } from "@klimadao/lib/constants";
import * as styles from "./styles";

interface Props {
  value: string;
  tokenIcon: StaticImageData;
  tokenName: string;
  spenderAddress: string;
  onApproval: () => void;
  onSuccess: () => void;
  status: TransactionStatusMessage | null;
}

export const Approve: FC<Props> = (props) => {
  const statusType = props.status?.statusType;

  const showButtonSpinner =
    statusType === "userConfirmation" || statusType === "networkConfirmation";

  const success = statusType === "done";

  const showApproveButton = !showButtonSpinner && !success;
  const showNextButton = !showButtonSpinner && success;
  return (
    <>
      <div
        className={cx(styles.contentContainer, {
          success,
        })}
      >
        <Text>
          <Trans id="transaction_modal.approve.allow_amount">
            The first step is to grant the approval to transfer your carbon
            asset from your wallet to Carbonmark, the next step is to approve
            the actual transfer and complete your retirement.
          </Trans>
        </Text>
        <RetireValue
          label={
            <label className={styles.details}>
              <Trans id="transaction_modal.approve.approve_quantity.contract_address">
                Contract address
              </Trans>
            </label>
          }
          value={concatAddress(props.spenderAddress)}
          valueHref={urls.polygonscan + `/address/${props.spenderAddress}`}
        />
        <RetireValue
          label={
            <label className={styles.details}>
              <Trans id="transaction_modal.approve_quantity.quantity">
                Confirm Amount
              </Trans>
            </label>
          }
          value={props.value || "0"}
          icon={props.tokenIcon}
          iconName={props.tokenName}
        />
      </div>
      {!!props.status && (
        <div className={styles.statusMessage}>
          {success && <CheckIcon />}
          <Text t="caption" color="lighter" align="center">
            {getStatusMessage(props.status)}
          </Text>
        </div>
      )}
      <div className={styles.buttonRow}>
        {showButtonSpinner && (
          <div className={styles.buttonRow_spinner}>
            <Spinner />
          </div>
        )}
        {showApproveButton && (
          <ButtonPrimary
            label={<Trans id="shared.approve">Approve</Trans>}
            onClick={() => props.onApproval()}
            className={styles.submitButton}
          />
        )}
        {showNextButton && (
          <ButtonPrimary
            label={<Trans id="transaction_modal.next">Next</Trans>}
            onClick={() => props.onSuccess()}
            className={styles.submitButton}
          />
        )}
      </div>
    </>
  );
};
