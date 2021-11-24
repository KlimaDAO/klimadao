import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { ethers, providers } from "ethers";

import {
  changeApprovalTransaction,
  changeStakeTransaction,
} from "actions/stake";
import { useAppDispatch } from "state";
import { incrementStake, decrementStake, setStakeAllowance } from "state/user";
import {
  selectAppState,
  selectBalances,
  selectStakeAllowance,
} from "state/selectors";
import { TxnStatus } from "actions/utils";

import { Spinner } from "@klimadao/lib/components";
import {
  secondsUntilBlock,
  prettifySeconds,
  trimWithPlaceholder,
  concatAddress,
} from "@klimadao/lib/utils";
import t from "@klimadao/lib/theme/typography.module.css";
import styles from "./index.module.css";

const WithPlaceholder: FC<{
  condition: boolean;
  placeholder: string;
}> = (props) => {
  if (props.condition) {
    return <>{props.placeholder}</>;
  }
  return <>{props.children}</>;
};

interface Props {
  provider: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
}

export const Stake = (props: Props) => {
  const { provider, address, isConnected } = props;
  const dispatch = useAppDispatch();

  const [view, setView] = useState("stake");
  const [status, setStatus] = useState<TxnStatus | "">("");
  const [quantity, setQuantity] = useState("");

  const {
    fiveDayRate,
    currentIndex,
    stakingRebase,
    stakingAPY,
    currentBlock,
    rebaseBlock,
  } = useSelector(selectAppState);

  const stakeAllowance = useSelector(selectStakeAllowance);
  const balances = useSelector(selectBalances);

  const isLoading =
    !stakeAllowance || typeof stakeAllowance.klima === "undefined";

  const nextRebasePercent = stakingRebase && stakingRebase * 100;
  const fiveDayRatePercent = fiveDayRate && fiveDayRate * 100;
  const stakingAPYPercent = stakingAPY && stakingAPY * 100;

  const setMax = () => {
    setStatus("");
    if (view === "stake") {
      setQuantity(balances?.klima ?? "0");
    } else {
      setQuantity(balances?.sklima ?? "0");
    }
  };

  const handleApproval = (action: "stake" | "unstake") => async () => {
    try {
      const value = await changeApprovalTransaction({
        provider,
        action,
        onStatus: setStatus,
      });
      if (action === "stake") {
        dispatch(setStakeAllowance({ klima: value }));
      } else {
        dispatch(setStakeAllowance({ sklima: value }));
      }
    } catch (e) {
      return;
    }
  };

  const handleStake = (action: "stake" | "unstake") => async () => {
    try {
      const value = quantity.toString();
      setQuantity("");
      await changeStakeTransaction({
        value,
        provider,
        action,
        onStatus: setStatus,
      });
      dispatch(
        action === "stake" ? incrementStake(value) : decrementStake(value)
      );
    } catch (e) {
      return;
    }
  };

  const hasApproval = (action: "stake" | "unstake") => {
    if (action === "stake")
      return stakeAllowance && !!Number(stakeAllowance.klima);
    if (action === "unstake")
      return stakeAllowance && !!Number(stakeAllowance.sklima);
  };

  const timeUntilRebase = () => {
    if (currentBlock && rebaseBlock) {
      const seconds = secondsUntilBlock(currentBlock, rebaseBlock);
      return prettifySeconds(seconds);
    }
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
    } else if (view === "stake" && !hasApproval("stake")) {
      return { children: "Approve", onClick: handleApproval("stake") };
    } else if (view === "unstake" && !hasApproval("unstake")) {
      return { children: "Approve", onClick: handleApproval("unstake") };
    } else if (view === "stake" && hasApproval("stake")) {
      return {
        children: "Stake",
        onClick: handleStake("stake"),
        disabled: !balances?.klima || !value || value > Number(balances.klima),
      };
    } else if (view === "unstake" && hasApproval("unstake")) {
      return {
        children: "Unstake",
        onClick: handleStake("unstake"),
        disabled:
          !balances?.sklima || !value || value > Number(balances.sklima),
      };
    } else {
      return { children: "ERROR", onClick: undefined, disabled: true };
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

  const showSpinner =
    isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>Stake KLIMA.</h2>
        <p className={t.body2}>
          Hold, stake, and compound. If the protocol earns a profit selling
          carbon bonds, these rewards are shared among all holders of staked
          KLIMA (sKLIMA).
        </p>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.stakeSwitch}>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setQuantity("");
              setStatus("");
              setView("stake");
            }}
            data-active={view === "stake"}
          >
            Stake
          </button>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setQuantity("");
              setStatus("");
              setView("unstake");
            }}
            data-active={view === "unstake"}
          >
            Unstake
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
            placeholder={`Amount to ${
              { stake: "stake", unstake: "unstake" }[view]
            }`}
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
            {concatAddress(address)}
          </p>
        )}
        <div className="stake-price-data-row">
          <p className="price-label">Balance</p>
          <p className="price-data">
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.klima, 4)}</span> KLIMA
            </WithPlaceholder>
          </p>
        </div>

        <div className="stake-price-data-row">
          <p className="price-label">Staked</p>
          <p className="price-data">
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.sklima, 4)}</span> sKLIMA
            </WithPlaceholder>
          </p>
        </div>
        <div className="stake-price-data-row">
          <p className="price-label">Time until rebase</p>
          <p className="price-data">
            <span>{timeUntilRebase()}</span>
          </p>
        </div>

        <div className="stake-price-data-row">
          <p className="price-label">Next Rebase</p>
          <p className="price-data">
            <span>{trimWithPlaceholder(nextRebasePercent, 2)}</span>%
          </p>
        </div>

        <div className="stake-price-data-row">
          <p className="price-label">ROI (5-day rate)</p>
          <p className="price-data">
            <span>{trimWithPlaceholder(fiveDayRatePercent, 2)}</span>%
          </p>
        </div>

        <div className="stake-price-data-row">
          <p className="price-label">APY</p>
          <p className="price-data">
            <span>{trimWithPlaceholder(stakingAPYPercent, 2)}</span>%
          </p>
        </div>

        <div className="stake-price-data-row">
          <p className="price-label">Current index</p>
          <p className="price-data">
            <span>{trimWithPlaceholder(currentIndex, 4)}</span> KLIMA
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
  );
};
