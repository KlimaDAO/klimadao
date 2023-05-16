import { cx } from "@emotion/css";
import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { concatAddress } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import CheckIcon from "@mui/icons-material/Check";
import { getStatusMessage, TransactionStatusMessage } from "lib/statusMessage";
import { StaticImageData } from "next/image";
import { FC } from "react";
import { RetireValue } from "./RetireValues";
import * as styles from "./styles";

interface Props {
  value: string;
  tokenIcon: StaticImageData;
  tokenName: string;
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
        <Text t="caption">
          <Trans id="transaction_modal.submit.confirm_transaction_1">
            The previous step granted the approval to transfer your carbon asset
            from your wallet to Carbonmark, your retirement has not been
            completed yet.
          </Trans>
        </Text>
        <Text t="caption">
          <Trans id="transaction_modal.submit.confirm_transaction_2">
            The previous step granted the approval to transfer your carbon asset
            from your wallet to Carbonmark, your retirement has not been
            completed yet.
          </Trans>
        </Text>
        <RetireValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="transaction_modal.submit.contract_address">
                Contract address
              </Trans>
            </Text>
          }
          value={concatAddress(props.spenderAddress)}
          valueHref={urls.polygonscan + `/address/${props.spenderAddress}`}
        />
        <RetireValue
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
