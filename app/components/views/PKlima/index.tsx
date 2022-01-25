import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { providers } from "ethers";

import { selectNotificationStatus } from "state/selectors";
import { setAppState, AppNotificationStatus, TxnStatus } from "state/app";

import { Spinner } from "@klimadao/lib/components";
import { trimWithPlaceholder } from "@klimadao/lib/utils";

import T from "@klimadao/lib/theme/typography.module.css";
import { Trans, defineMessage } from "@lingui/macro";
import { i18n } from "@lingui/core";

import {
  selectAppState,
  selectBalances,
  selectExerciseAllowance,
  selectPklimaTerms,
} from "state/selectors";
import { redeemPklima, setExerciseAllowance } from "state/user";
import { useAppDispatch } from "state";

import {
  exerciseTransaction,
  changeApprovalTransaction,
  loadTerms,
} from "actions/pklima";
import styles from "components/views/Stake/index.module.css";

interface Props {
  provider: providers.JsonRpcProvider;
  address?: string;
  isConnected?: boolean;
}

export const PKlima: FC<Props> = (props) => {
  const { provider, address, isConnected } = props;
  const dispatch = useAppDispatch();

  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus && fullStatus.statusType;

  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

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
    setStatus(null);
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
        disabled: true,
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
        disabled: true,
      };
    } else if (!hasApproval("pklima")) {
      return {
        children: <Trans id="button.pklima">1. Approve pKLIMA</Trans>,
        onClick: handleApproval("pklima"),
      };
    } else if (!hasApproval("bct")) {
      return {
        children: <Trans id="button.bct">2. Approve BCT</Trans>,
        onClick: handleApproval("bct"),
      };
    } else {
      return {
        children: <Trans id="button.exercise">EXERCISE</Trans>,
        onClick: handleExercise,
        disabled:
          !value || !terms?.redeemable || value > Number(terms.redeemable),
      };
    }
  };

  defineMessage({
    id: "pklima.klima_to_exercise",
    message: "PKLIMA TO EXERCISE",
  });

  return (
    <>
      <div className={styles.stakeCard}>
        <div className={styles.stakeCard_header}>
          <h2 className={T.h4}>
            <Trans id="pklima.title">Exercise pKLIMA</Trans>
          </h2>
          <p className={T.body2}>
            <Trans id="pklima.caption">
              Exercise 1 pKLIMA and 1 BCT to receive 1 KLIMA.
            </Trans>
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
                setStatus(null);
              }}
              type="number"
              placeholder={i18n._("pklima.klima_to_exercise")}
              min="0"
            />
            <button
              className={styles.stakeInput_button}
              type="button"
              onClick={setMax}
            >
              <Trans id="button.max">Max</Trans>
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
            <div className={styles.dataContainer_label}>
              <Trans id="pklima.pklima_balance">pKLIMA Balance</Trans>
            </div>
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
            <div className={styles.dataContainer_label}>
              <Trans id="pklima.bct_balance">BCT Balance</Trans>
            </div>
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
            <div className={styles.dataContainer_label}>
              <Trans id="pklima.supply_share_limit">Supply Share Limit</Trans>
            </div>
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
            <div className={styles.dataContainer_label}>
              <Trans id="pklima.pklima_redeemed">pKLIMA Redeemed</Trans>
            </div>
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
              <Trans id="pklima.claimed_amount">
                Claimed Amount (index-adjusted)
              </Trans>
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
              <Trans id="pklima.max">Max (index-adjusted)</Trans>
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
      </div>
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
