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
  onApproval: () => void;
  onSuccess: () => void;
  status?: AppNotificationStatus | null;
}

export const Approve: FC<Props> = (props) => {
  const statusType = props.status?.statusType;

  const showButtonSpinner =
    statusType === "userConfirmation" || statusType === "networkConfirmation";

  const success = statusType === "done";

  const showApproveButton = !showButtonSpinner && !success;
  const showNextButton = !showButtonSpinner && success;

  const spenderAddress = getSpenderAddress(props.spender);

  return (
    <>
      <div
        className={cx(styles.contentContainer, {
          success,
        })}
      >
        <Text>
          <Trans id="transaction_modal.approve.allow_amount">
            You must first approve the contract with the spender so that you can
            spend the amount you want.
          </Trans>
        </Text>
        <HighlightValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="transaction_modal.approve.allow_amount.contract_owner">
                Contract Owner:
              </Trans>
            </Text>
          }
          value={
            spenderAddress
              ? concatAddress(spenderAddress)
              : "Unknown Contract Owner"
          }
          warn={!spenderAddress}
        />
        <HighlightValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="transaction_modal.allow_amount.amount">
                Approve allowance to spend:
              </Trans>
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
        {showApproveButton && (
          <ButtonPrimary
            variant="icon"
            label={
              <>
                <SendRounded />
                <Trans id="shared.approve">Approve</Trans>
              </>
            }
            onClick={() => props.onApproval()}
            className={styles.submitButton}
          />
        )}
        {showNextButton && (
          <ButtonPrimary
            variant="icon"
            label={
              <>
                <SendRounded />
                <Trans id="transaction_modal.next">Next</Trans>
              </>
            }
            onClick={() => props.onSuccess()}
            className={styles.submitButton}
          />
        )}
      </div>
    </>
  );
};
