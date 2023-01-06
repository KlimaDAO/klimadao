import { cx } from "@emotion/css";
import { Trans } from "@lingui/macro";
import { FC } from "react";

import { concatAddress } from "@klimadao/lib/utils";
import CheckIcon from "@mui/icons-material/Check";
import SendRounded from "@mui/icons-material/SendRounded";
import { marketplaceTokenInfoMap } from "components/pages/Marketplace/lib/getTokenInfo";
import {
  getStatusMessage,
  TransactionStatusMessage,
} from "components/pages/Marketplace/lib/statusMessage";

import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import { HighlightValue } from "./HighlightValue";
import { Value } from "./types";

import * as styles from "./styles";

interface Props {
  amount: Value;
  price?: Value;
  spenderAddress: string;
  onSubmit: () => void;
  onClose: () => void;
  status: TransactionStatusMessage | null;
  description?: string;
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
          <Trans id="marketplace.transaction_modal.submit.title">
            Please submit the transaction
          </Trans>
        </Text>
        {!!props.description && <Text>{props.description}</Text>}
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
                Submit amount
              </Trans>
            </Text>
          }
          value={props.amount.value}
          icon={
            props.amount.token &&
            marketplaceTokenInfoMap[props.amount.token].icon
          }
          iconName={props.amount.token}
        />
        {!!props.price && (
          <HighlightValue
            label={
              <Text t="caption" color="lighter">
                <Trans id="marketplace.transaction_modal.submit.price">
                  Submit price per tonne
                </Trans>
              </Text>
            }
            value={props.price.value}
            icon={
              props.price.token &&
              marketplaceTokenInfoMap[props.price.token].icon
            }
            iconName={props.price.token}
          />
        )}
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
            label={
              <Trans id="marketplace.transaction_modal.submit.button">
                Submit
              </Trans>
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
