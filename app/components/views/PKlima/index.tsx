import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { providers } from "ethers";

import { Spinner } from "@klimadao/lib/components";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import t from "@klimadao/lib/theme/typography.module.css";

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
      return { children: "Not Connected", onClick: undefined, disabled: true };
    } else if (isLoading) {
      return {
        children: "Loading",
        onClick: undefined,
        disabled: true,
      };
    } else if (
      status === "userConfirmation" ||
      status === "networkConfirmation"
    ) {
      return { children: "Confirming", onClick: undefined, disabled: true };
    } else if (!hasApproval("pklima")) {
      return {
        children: "1. Approve pKLIMA",
        onClick: handleApproval("pklima"),
      };
    } else if (!hasApproval("bct")) {
      return { children: "2. Approve BCT", onClick: handleApproval("bct") };
    } else {
      return {
        children: "EXERCISE",
        onClick: handleExercise,
        disabled:
          !value || !terms?.redeemable || value > Number(terms.redeemable),
      };
    }
  };

  const getStatusMessage = () => {
    if (status === "userConfirmation") {
      return "Please click 'confirm' in your wallet to continue.";
    } else if (status === "networkConfirmation") {
      return "Transaction initiated. Waiting for network confirmation.";
    } else if (status === "error") {
      return "❌ Error: something went wrong...";
    } else if (status === "done") {
      return "✔️ Success!";
    } else if (status === "userRejected") {
      return "✖️ You chose to reject the transaction.";
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
          <div className={styles.stakeSwitch}>
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

        <div className={styles.dataContainer}>
          {address && (
            <p className={styles.dataContainer_address}>
              {address.slice(0, 5)}..{address.slice(address.length - 3)}
            </p>
          )}
          <div className="stake-price-data-row">
            <p className="price-label">pKLIMA Balance</p>
            <p className="price-data">
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(balances?.pklima, 4)}</span> pKLIMA
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Redeemable Amount</p>
            <p className="price-data">
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(terms?.redeemable, 4)}</span> pKLIMA
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">BCT Balance</p>
            <p className="price-data">
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(balances?.bct, 4)}</span> BCT
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Supply Share Limit</p>
            <p className="price-data">
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(terms?.supplyShare, 2)}</span>%
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">pKLIMA Redeemed</p>
            <p className="price-data">
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(terms?.claimed, 4)}</span> pKLIMA
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Claimed Amount (index-adjusted)</p>
            <p className="price-data">
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(indexAdjustedClaim, 4)}</span> KLIMA
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Max (index-adjusted)</p>
            <p className="price-data">
              <WithPlaceholder
                condition={!isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(terms?.max, 4)}</span> KLIMA
              </WithPlaceholder>
            </p>
          </div>
        </div>
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
