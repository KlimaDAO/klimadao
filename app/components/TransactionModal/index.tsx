import { FC, ReactNode, useState, useEffect } from "react";
import { Trans } from "@lingui/macro";
import { cx } from "@emotion/css";
import { AppNotificationStatus } from "state/app";
import { getSpenderAddress, concatAddress } from "@klimadao/lib/utils";
import { getStatusMessage } from "actions/utils";
import {
  AllowancesToken,
  AllowancesSpender,
} from "@klimadao/lib/types/allowances";

import { tokenInfo } from "lib/getTokenInfo";

import { Modal } from "components/Modal";
import { Image } from "components/Image";

import { Text, Spinner, ButtonPrimary } from "@klimadao/lib/components";

import * as styles from "./styles";

interface Props {
  title: ReactNode;
  value: string;
  token: AllowancesToken;
  spender: AllowancesSpender;
  onCloseModal: () => void;
  onApproval: () => void;
  onSubmit: () => void;
  status?: AppNotificationStatus | null;
  hasApproval: boolean;
}

interface HighlightValueProps {
  label: ReactNode;
  value: string;
  icon?: StaticImageData;
  iconName?: string;
  warn?: boolean;
}

const HighlightValue: FC<HighlightValueProps> = (props) => {
  return (
    <div className={styles.valueContainer}>
      <div className="label">{props.label}</div>
      <div className={styles.value}>
        {props.icon && (
          <Image
            className="icon"
            src={props.icon}
            width={48}
            height={48}
            alt={props.iconName}
          />
        )}

        <Text
          t="body3"
          className={cx("value", {
            warn: !!props.warn,
          })}
        >
          {props.value}
        </Text>
      </div>
    </div>
  );
};
export const TransactionModal: FC<Props> = (props) => {
  const [view, setView] = useState<"approve" | "submit">("approve");
  const [isLoading, setIsLoading] = useState(true);

  const statusType = props.status?.statusType;

  const showButtonSpinner =
    statusType === "userConfirmation" || statusType === "networkConfirmation";

  const spenderAddress = getSpenderAddress(props.spender);

  useEffect(() => {
    if (props.hasApproval) {
      setView("submit");
    }
    setIsLoading(false);
  }, []);

  return (
    <Modal title={props.title} onToggleModal={props.onCloseModal}>
      <div className={styles.container}>
        <div className={styles.viewSwitch}>
          <button
            className={styles.switchButton}
            onClick={() => {
              setView("approve");
            }}
            data-active={view === "approve"}
            disabled={isLoading}
          >
            1. <Trans id="transaction_modal.approve.title">Approve</Trans>
          </button>
          <button
            className={styles.switchButton}
            onClick={() => {
              setView("submit");
            }}
            data-active={view === "submit"}
            disabled={isLoading || view === "approve"}
          >
            2. <Trans id="transaction_modal.approve.title">Submit</Trans>
          </button>
        </div>
        {isLoading && (
          <div className={styles.spinner_container}>
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <>
            <Text>
              <Trans id="transaction_modal.approve.allow_amount">
                You must first approve the contract with the spender so that you
                can spend the amount you want.
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
          </>
        )}
        {!!props.status && (
          <Text t="caption" color="lighter" align="center">
            {getStatusMessage(props.status)}
          </Text>
        )}
        <div className={styles.buttonRow}>
          {showButtonSpinner ? (
            <div className={styles.buttonRow_spinner}>
              <Spinner />
            </div>
          ) : (
            <ButtonPrimary
              label={<Trans id="shared.approve">Approve</Trans>}
              onClick={() => props.onApproval()}
              className={styles.submitButton}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
