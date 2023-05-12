import { cx } from "@emotion/css";
import { concatAddress } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import CheckIcon from "@mui/icons-material/Check";
import { getStatusMessage } from "lib/statusMessage";
import { AppNotificationStatus } from "lib/types/carbonmark";
import { StaticImageData } from "next/image";
import { FC } from "react";
import { HighlightValue } from "./HighlightValue";

import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";

import { urls } from "@klimadao/lib/constants";
import * as styles from "./styles";

interface Props {
  value: string;
  tokenIcon: StaticImageData;
  tokenName: string;
  spenderAddress: string;
  onApproval: () => void;
  onSuccess: () => void;
  status: AppNotificationStatus | null;
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
          <Trans id="transaction_modal.approve.allow_amount">
            You must first give permission to our smart contract to transfer
            tokens on your behalf.
          </Trans>
        </Text>
        <HighlightValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="transaction_modal.approve.approve_quantity.contract_address">
                Contract address
              </Trans>
            </Text>
          }
          value={concatAddress(props.spenderAddress)}
          valueHref={urls.polygonscan + `/address/${props.spenderAddress}`}
        />
        <HighlightValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="transaction_modal.approve_quantity.quantity">
                Quantity to approve
              </Trans>
            </Text>
          }
          value={props.value || "0"}
          // icon={props.tokenIcon}
          iconName={props.tokenName}
        />
      </div>
      {!!props.status && (
        <div className={styles.statusMessage}>
          {success && <CheckIcon />}
          <Text t="caption" color="lighter" align="center">
            {getStatusMessage(props.status.statusType)}
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
            label={<Trans id="shared.approve">Approve</Trans>}
            onClick={() => props.onApproval()}
            className={styles.submitButton}
          />
        )}
        {showNextButton && (
          <ButtonPrimary
            label={<Trans id="transaction_modal.next">Next</Trans>}
            onClick={() => props.onSuccess()}
            className={styles.submitButton}
          />
        )}
      </div>
    </>
  );
};
