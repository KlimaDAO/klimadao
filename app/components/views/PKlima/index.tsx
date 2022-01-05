import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { providers } from "ethers";

import { Spinner } from "@klimadao/lib/components";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import t from "@klimadao/lib/theme/typography.module.css";

// Copied from Stake view despite T/t
import T from "@klimadao/lib/theme/typography.module.css";
import styles from "components/views/Stake/index.module.css";
import { Trans, t, defineMessage } from "@lingui/macro";
import { i18n } from "@lingui/core";

import {
  selectAppState,
  selectBalances,
  selectExerciseAllowance,
  selectPklimaTerms,
} from "state/selectors";
import { redeemPklima, setExerciseAllowance } from "state/user";
import { useAppDispatch } from "state";

import { TxnStatus } from "actions/utils";
import {
  exerciseTransaction,
  changeApprovalTransaction,
  loadTerms,
} from "actions/pklima";
import styles from "components/views/Stake/index.module.css";
import { ClaimExceededModal } from "./ClaimExceededModal";

interface Props {
  provider: providers.JsonRpcProvider;
  address?: string;
  isConnected?: boolean;
}

export const PKlima: FC<Props> = (props) => {
  const { provider, address, isConnected } = props;
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<TxnStatus | "" | "claimExceeded">("");
  const [quantity, setQuantity] = useState("");

  const balances = useSelector(selectBalances);
  const { currentIndex } = useSelector(selectAppState);
  const allowances = useSelector(selectExerciseAllowance);
  const terms = useSelector(selectPklimaTerms);

  const indexAdjustedClaim = Number(terms?.claimed) * Number(currentIndex);

  const isLoading = !allowances || typeof allowances.pklima === "undefined";
  const showSpinner =
    isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  useEffect(() => {
    if (!address) return;
    dispatch(
      loadTerms({
        onStatus: setStatus,
        provider,
        address,
      })
    );
  }, [address]);

  const setMax = () => {
    setStatus("");
    setQuantity(terms?.redeemable ?? "0");
  };

  const handleApproval = (action: "pklima" | "bct") => async () => {
    try {
      const value = await changeApprovalTransaction({
        provider,
        action,
        onStatus: setStatus,
      });
      dispatch(setExerciseAllowance({ [action]: value }));
    } catch (e) {
      return;
    }
  };

  const handleExercise = async () => {
    try {
      const value = quantity.toString();
      setQuantity("");
      await exerciseTransaction({
        value,
        provider,
        onStatus: setStatus,
      });
      dispatch(redeemPklima(value));
    } catch (e) {
      return;
    }
  };

  const hasApproval = (token: "pklima" | "bct") => {
    if (token === "pklima") return allowances && !!Number(allowances.pklima);
    return allowances && !!Number(allowances.bct);
  };

  const getButtonProps = () => {
    const value = Number(quantity || "0");
    if (!isConnected || !address) {
      return { 
        children: <Trans id="button.not_connected">Not connected</Trans>,
        onClick: undefined, 
        disabled: true 
      };
    } else if (isLoading) {
      return {
        children: <Trans id="button.loading">Loading</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (
      status === "userConfirmation" ||
      status === "networkConfirmation"
    ) {
      return { 
        children: <Trans id="button.confirming">Confirming</Trans>,
        onClick: undefined, 
        disabled: true 
      };
    } else if (!hasApproval("pklima")) {
      return {
        children: <Trans id="button.pklima">1. Approve pKLIMA</Trans>,
        onClick: handleApproval("pklima"),
      };
    } else if (!hasApproval("bct")) {
      return { 
        children: <Trans id="button.bct">2. Approve BCT</Trans>,
        onClick: handleApproval("bct") };
    } else {
      return {
        children: <Trans id="button.exercise">EXERCISE</Trans>,
        onClick: handleExercise,
        disabled:
          !value || !terms?.redeemable || value > Number(terms.redeemable),
      };
    }
  };

  const getStatusMessage = () => {
    if (status === "userConfirmation") {
      return (
        <Trans id="status.pending_confirmation">
          Please click 'confirm' in your wallet to continue.
        </Trans>
      );
    } else if (status === "networkConfirmation") {
      return (
        <Trans id="status.transaction_started">
          Transaction initiated. Waiting for network confirmation.
        </Trans>
      );
    } else if (status === "error") {
      return (
        <Trans id="status.transaction_error">
          ❌ Error: something went wrong...
        </Trans>
      );
    } else if (status === "done") {
      return <Trans id="status.transaction_success">✔️ Success!.</Trans>;
    } else if (status === "userRejected") {
      return (
        <Trans id="status.transaction_rejected">
          ✖️ You chose to reject the transaction.
        </Trans>
      );
    }
    return null;
  };

  return (
    <>
      <div className={styles.stakeCard}>
        <div className={styles.stakeCard_header}>
          <h2 className={t.h4}>Exercise pKLIMA</h2>
          <p className={t.body2}>
            Exercise 1 pKLIMA and 1 BCT to receive 1 KLIMA.
          </p>
        </div>
        <div className={styles.inputsContainer}>
          <div
            className={styles.stakeSwitch}
            style={{ gridTemplateColumns: "1fr" }}
          >
            <button
              className={styles.switchButton}
              type="button"
              data-active="true"
            >
              pKLIMA
            </button>
          </div>
          <div className={styles.stakeInput}>
            <input
              className={styles.stakeInput_input}
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setStatus("");
              }}
              type="number"
              placeholder="PKLIMA to Exercise"
              min="0"
            />
            <button
              className={styles.stakeInput_button}
              type="button"
              onClick={setMax}
            >
              Max
            </button>
          </div>
        </div>

        <ul className={styles.dataContainer}>
          {address && (
            <p className={styles.dataContainer_address}>
              {address.slice(0, 5)}..{address.slice(address.length - 3)}
            </p>
          )}
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>pKLIMA Balance</div>
            <div className={styles.dataContainer_value}>
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(balances?.pklima, 4)}</span> pKLIMA
              </WithPlaceholder>
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>BCT Balance</div>
            <div className={styles.dataContainer_value}>
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(balances?.bct, 4)}</span> BCT
              </WithPlaceholder>
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>Supply Share Limit</div>
            <div className={styles.dataContainer_value}>
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(terms?.supplyShare, 2)}</span>%
              </WithPlaceholder>
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>pKLIMA Redeemed</div>
            <div className={styles.dataContainer_value}>
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(terms?.claimed, 4)}</span> pKLIMA
              </WithPlaceholder>
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              Claimed Amount (index-adjusted)
            </div>
            <div className={styles.dataContainer_value}>
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(indexAdjustedClaim, 4)}</span> KLIMA
              </WithPlaceholder>
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              Max (index-adjusted)
            </div>
            <div className={styles.dataContainer_value}>
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(terms?.max, 4)}</span> KLIMA
              </WithPlaceholder>
            </div>
          </li>
        </ul>
        <div className={styles.buttonRow}>
          <div />
          {showSpinner ? (
            <div className={styles.buttonRow_spinner}>
              <Spinner />
            </div>
          ) : (
            <div />
          )}
          <button
            type="button"
            className={styles.submitButton}
            {...getButtonProps()}
          />
        </div>
        {getStatusMessage() && (
          <p className={styles.statusMessage}>{getStatusMessage()}</p>
        )}
      </div>
      {status === "claimExceeded" && <ClaimExceededModal />}
    </>
  );
};

const WithPlaceholder: FC<{ condition: boolean; placeholder: string }> = (
  props
) => {
  if (props.condition) {
    return <>{props.placeholder}</>;
  }
  return <>{props.children}</>;
};
