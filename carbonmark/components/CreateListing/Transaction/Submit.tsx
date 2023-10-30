import { cx } from "@emotion/css";
import { Trans } from "@lingui/macro";
import CheckIcon from "@mui/icons-material/Check";
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
  amount: string;
  price?: Value;
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
          <Trans>
            Almost finished! The last step is to create the listing and submit
            it to the system. Please verify the quantity and price below.
          </Trans>
        </Text>
        <Text>
          <Trans>You can delete this listing at any time.</Trans>
        </Text>

        <HighlightValue
          label={
            <Text>
              <Trans>Quantity</Trans>
            </Text>
          }
          value={props.amount}
        />
        {!!props.price && (
          <HighlightValue
            label={
              <Text>
                <Trans>Price per tonne</Trans>
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
          <Text color="lighter" align="center">
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
            label={<Trans>Submit</Trans>}
            onClick={() => props.onSubmit()}
            className={styles.submitButton}
          />
        )}
        {showCloseButton && (
          <ButtonPrimary
            variant="gray"
            label={<Trans>Close</Trans>}
            onClick={() => props.onClose()}
            className={styles.submitButton}
          />
        )}
      </div>
    </>
  );
};
