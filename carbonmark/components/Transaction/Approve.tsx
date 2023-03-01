import { cx } from "@emotion/css";
import { Spinner } from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import CheckIcon from "@mui/icons-material/Check";
import SendRounded from "@mui/icons-material/SendRounded";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
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
  onApproval: () => void;
  onSuccess: () => void;
  status: TransactionStatusMessage | null;
  description?: string;
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
          <Trans id="transaction_modal.approve.title">
            Please confirm the transaction
          </Trans>
        </Text>
        {!!props.description && <Text t="body1">{props.description}</Text>}
        <HighlightValue
          label={
            <Text t="body1" color="lighter">
              <Trans id="transaction_modal.approve.contract_address">
                Contract address
              </Trans>
            </Text>
          }
          value={concatAddress(props.spenderAddress)}
        />
        <HighlightValue
          label={
            <Text t="body1" color="lighter">
              <Trans id="transaction_modal.approve.amount">
                Confirm amount
              </Trans>
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
                <Trans id="transaction_modal.approve.price">
                  Confirm price per tonne
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
        {showApproveButton && (
          <ButtonPrimary
            icon={<SendRounded />}
            label={<Trans id="shared.approve">Approve</Trans>}
            onClick={() => props.onApproval()}
            className={styles.submitButton}
          />
        )}
        {showNextButton && (
          <ButtonPrimary
            icon={<SendRounded />}
            label={<Trans id="transaction_modal.next">Next</Trans>}
            onClick={() => props.onSuccess()}
            className={styles.submitButton}
          />
        )}
      </div>
    </>
  );
};
