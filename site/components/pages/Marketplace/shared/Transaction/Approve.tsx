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
        <Text>
          <Trans id="marketplace.transaction_modal.approve.allow_amount">
            You must first give permission to our smart contract to transfer
            tokens on your behalf.
          </Trans>
        </Text>
        <HighlightValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="marketplace.transaction_modal.approve.approve_quantity.contract_address">
                Contract address
              </Trans>
            </Text>
          }
          value={concatAddress(props.spenderAddress)}
        />
        <HighlightValue
          label={
            <Text t="caption" color="lighter">
              <Trans id="marketplace.transaction_modal.approve_quantity.quantity">
                Quantity to approve
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
                <Trans id="marketplace.transaction_modal.next">Next</Trans>
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
