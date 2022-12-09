import { FC } from "react";
import { Trans } from "@lingui/macro";
import { cx } from "@emotion/css";

import { concatAddress } from "@klimadao/lib/utils";
import SendRounded from "@mui/icons-material/SendRounded";
import CheckIcon from "@mui/icons-material/Check";
import { getStatusMessage, TransactionStatusMessage } from "./lib";
import {
  marketplaceTokenInfoMap,
  MarketplaceToken,
} from "components/pages/Marketplace/lib/getTokenInfo";

import { HighlightValue } from "./HighlightValue";
import { Text, Spinner, ButtonPrimary } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Props {
  value: string;
  token: MarketplaceToken;
  spenderAddress: string;
  onSubmit: () => void;
  onClose: () => void;
  status: TransactionStatusMessage | null;
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
          <Trans id="marketplace.transaction_modal.submit.confirm_transaction">
            Please submit the transaction.
          </Trans>
        </Text>
        <HighlightValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="marketplace.transaction_modal.submit.contract_address">
                Contract address
              </Trans>
            </Text>
          }
          value={concatAddress(props.spenderAddress)}
        />
        <HighlightValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="marketplace.transaction_modal.submit.amount">
                Confirm amount
              </Trans>
            </Text>
          }
          value={props.value || "0"}
          icon={marketplaceTokenInfoMap[props.token].icon}
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
                <Trans id="marketplace.transaction_modal.submit.button">
                  Submit
                </Trans>
              </>
            }
            onClick={() => props.onSubmit()}
            className={styles.submitButton}
          />
        )}
        {showCloseButton && (
          <ButtonPrimary
            variant="gray"
            label={
              <Trans id="marketplace.transaction_modal.close">Close</Trans>
            }
            onClick={() => props.onClose()}
            className={styles.submitButton}
          />
        )}
      </div>
    </>
  );
};
