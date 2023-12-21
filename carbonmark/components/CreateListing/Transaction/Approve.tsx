import { cx } from "@emotion/css";
import { Trans } from "@lingui/macro";
import CheckIcon from "@mui/icons-material/Check";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { getStatusMessage, TransactionStatusMessage } from "lib/statusMessage";
import { FC } from "react";
import { HighlightValue } from "./HighlightValue";
import * as styles from "./styles";

interface Props {
  amount: string;
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
        <Text t="body1">
          <Trans>
            First, approve the Carbonmark system to transfer this asset on your
            behalf.
          </Trans>
        </Text>
        <Text t="body1">
          <Trans>
            The assets will only be transferred out of your wallet when a sale
            is completed. You can revoke this allowance at any time.
          </Trans>
        </Text>
        <Text t="body1">
          <strong>
            <Trans>
              The allowance below reflects the sum of all your listings for this
              specific token. For ICR credit tokens, the allowance will reflect
              the sum of all your ICR token listings.
            </Trans>
          </strong>
        </Text>
        <HighlightValue
          label={
            <Text t="body1">
              <Trans>Total allowance</Trans>
            </Text>
          }
          value={props.amount}
        />
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
            label={<Trans>Approve</Trans>}
            onClick={() => props.onApproval()}
            className={styles.submitButton}
          />
        )}
        {showNextButton && (
          <ButtonPrimary
            label={<Trans>Next</Trans>}
            onClick={() => props.onSuccess()}
            className={styles.submitButton}
          />
        )}
      </div>
    </>
  );
};
