import { cx } from "@emotion/css";
import { Trans } from "@lingui/macro";
import { FC } from "react";

import CheckIcon from "@mui/icons-material/Check";
import SendRounded from "@mui/icons-material/SendRounded";
import { getStatusMessage } from "actions/utils";
import { AppNotificationStatus } from "state/app";

import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import { HighlightValue } from "./HighlightValue";

import { concatAddress } from "@klimadao/lib/utils";
import { StaticImageData } from "next/image";
import * as styles from "./styles";

interface Props {
  value: string;
  tokenIcon: StaticImageData;
  tokenName: string;
  spenderAddress: string;
  onSubmit: () => void;
  onClose: () => void;
  status: AppNotificationStatus | null;
}

export const Submit: FC<Props> = (props) => {
  const statusType = props.status?.statusType;

  const showButtonSpinner =
    statusType === "userConfirmation" || statusType === "networkConfirmation";

  const success = statusType === "done";

  const showSubmitButton = !showButtonSpinner && !success;
  const showCloseButton = !showButtonSpinner && success;

  return (
    <>
      <div
        className={cx(styles.contentContainer, {
          success,
        })}
      >
        <Text>
          <Trans id="transaction_modal.submit.confirm_transaction">
            Please submit the transaction.
          </Trans>
        </Text>
        <HighlightValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="transaction_modal.submit.contract_address">
                Contract address
              </Trans>
            </Text>
          }
          value={concatAddress(props.spenderAddress)}
        />
        <HighlightValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="transaction_modal.submit.amount">Confirm amount</Trans>
            </Text>
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
        {showSubmitButton && (
          <ButtonPrimary
            icon={<SendRounded />}
            label={<Trans id="transaction_modal.submit.button">Submit</Trans>}
            onClick={() => props.onSubmit()}
            className={styles.submitButton}
          />
        )}
        {showCloseButton && (
          <ButtonPrimary
            variant="gray"
            label={<Trans id="transaction_modal.close">Close</Trans>}
            onClick={() => props.onClose()}
            className={styles.submitButton}
          />
        )}
      </div>
    </>
  );
};
