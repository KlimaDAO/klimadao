import { cx } from "@emotion/css";
import { concatAddress } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import CheckIcon from "@mui/icons-material/Check";
import SendRounded from "@mui/icons-material/SendRounded";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { carbonmarkTokenInfoMap } from "lib/getTokenInfo";
import { getStatusMessage, TransactionStatusMessage } from "lib/statusMessage";
import { FC } from "react";
import { HighlightValue } from "./HighlightValue";
import * as styles from "./styles";
import { Value } from "./types";

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
          <Trans id="transaction_modal.submit.title">
            Please submit the transaction
          </Trans>
        </Text>
        {!!props.description && <Text>{props.description}</Text>}
        <HighlightValue
          label={
            <Text t="body1" color="lighter">
              <Trans id="transaction_modal.submit.contract_address">
                Contract address
              </Trans>
            </Text>
          }
          value={concatAddress(props.spenderAddress)}
        />
        <HighlightValue
          label={
            <Text t="body1" color="lighter">
              <Trans id="transaction_modal.submit.amount">Submit amount</Trans>
            </Text>
          }
          value={props.amount.value}
          icon={
            props.amount.token &&
            carbonmarkTokenInfoMap[props.amount.token].icon
          }
          iconName={props.amount.token}
        />
        {!!props.price && (
          <HighlightValue
            label={
              <Text t="body1" color="lighter">
                <Trans id="transaction_modal.submit.price">
                  Submit price per tonne
                </Trans>
              </Text>
            }
            value={props.price.value}
            icon={
              props.price.token &&
              carbonmarkTokenInfoMap[props.price.token].icon
            }
            iconName={props.price.token}
          />
        )}
      </div>
      {!!props.status && (
        <div className={styles.statusMessage}>
          {success && <CheckIcon />}
          <Text t="body1" color="lighter" align="center">
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
