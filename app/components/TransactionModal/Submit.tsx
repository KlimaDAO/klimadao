import { FC } from "react";
import { Trans } from "@lingui/macro";
import { cx } from "@emotion/css";

import { AppNotificationStatus } from "state/app";
import { getSpenderAddress, concatAddress } from "@klimadao/lib/utils";
import { getStatusMessage } from "actions/utils";
import {
  AllowancesToken,
  AllowancesSpender,
} from "@klimadao/lib/types/allowances";
import SendRounded from "@mui/icons-material/SendRounded";
import CheckIcon from "@mui/icons-material/Check";
import { tokenInfo } from "lib/getTokenInfo";

import { HighlightValue } from "./HighlightValue";
import { Text, Spinner, ButtonPrimary } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Props {
  value: string;
  token: AllowancesToken;
  spender: AllowancesSpender;
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

  const spenderAddress = getSpenderAddress(props.spender);

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
          value={concatAddress(spenderAddress)}
        />
        <HighlightValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="transaction_modal.submit.amount">Confirm amount</Trans>
            </Text>
          }
          value={props.value || "0"}
          icon={tokenInfo[props.token].icon}
          iconName={props.token}
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
            variant="icon"
            label={
              <>
                <SendRounded />
                <Trans id="transaction_modal.submit.button">Submit</Trans>
              </>
            }
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
