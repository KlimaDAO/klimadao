import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { providers } from "ethers";

import InfoOutlined from "@mui/icons-material/InfoOutlined";

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

import {
  Spinner,
  TextInfoTooltip,
  useTooltipSingleton,
} from "@klimadao/lib/components";
import {
  secondsUntilBlock,
  prettifySeconds,
  trimWithPlaceholder,
  concatAddress,
} from "@klimadao/lib/utils";
import T from "@klimadao/lib/theme/typography.module.css";
import styles from "./index.module.css";
import { Trans, t, defineMessage } from "@lingui/macro";
import { i18n } from "@lingui/core";

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
  const [singletonSource, singleton] = useTooltipSingleton();

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
  const nextRebaseValue =
    stakingRebase &&
    balances?.sklima &&
    stakingRebase * Number(balances.sklima);

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
    } else if (view === "stake" && !hasApproval("stake")) {
      return {
        children: <Trans id="button.approve">Approve</Trans>,
        onClick: handleApproval("stake"),
      };
    } else if (view === "unstake" && !hasApproval("unstake")) {
      return {
        children: <Trans id="button.approve">Approve</Trans>,
        onClick: handleApproval("unstake"),
      };
    } else if (view === "stake" && hasApproval("stake")) {
      return {
        children: <Trans id="button.stake">Stake</Trans>,
        onClick: handleStake("stake"),
        disabled: !balances?.klima || !value || value > Number(balances.klima),
      };
    } else if (view === "unstake" && hasApproval("unstake")) {
      return {
        children: <Trans id="button.unstake">Unstake</Trans>,
        onClick: handleStake("unstake"),
        disabled:
          !balances?.sklima || !value || value > Number(balances.sklima),
      };
    } else {
      return { children: "ERROR", onClick: undefined, disabled: true };
    }
  };
  const getAction = () => {
    if (view === "unstake") {
      return `Amount to stake`;
    } else {
      return `Amount to unstake`;
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

  const showSpinner =
    isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  defineMessage({
    id: "stake.balance.tooltip",
    message: "Unstaked KLIMA, not generating interest",
  });
  defineMessage({
    id: "stake.staked.tooltip",
    message: "Staked KLIMA generating interest",
  });
  defineMessage({
    id: "stake.rebase_rate.tooltip",
    message: "Percent interest to be rewarded at next rebase",
  });
  defineMessage({
    id: "stake.rebase_value.tooltip",
    message: "Approximate amount of sKLIMA you will receive at next rebase",
  });
  defineMessage({
    id: "stake.time_until_rebase.tooltip",
    message: "Approximate time remaining until next rewards distribution",
  });
  defineMessage({
    id: "stake.roi.tooltip",
    message:
      "Approximate return on investment, including compounding interest, should you remain staked for 5 days.",
  });
  defineMessage({
    id: "stake.apy.tooltip",
    message:
      "Annual Percentage Yield, including compounding interest, should the current reward rate remain unchained for 12 months (rates may be subject to change)",
  });
  defineMessage({
    id: "stake.current_index.tooltip",
    message:
      "Amount you would have today, if you staked 1 KLIMA on launch day. Useful for accounting purposes.",
  });

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={T.h4}>Stake KLIMA.</h2>
        <p className={T.body2}>
          <Trans id="stake.caption">
            Hold, stake, and compound. If the protocol earns a profit selling
            carbon bonds, these rewards are shared among all holders of staked
            KLIMA (sKLIMA).
          </Trans>
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
            placeholder={getAction()}
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
          <li className={styles.dataContainer_address}>
            {concatAddress(address)}
          </li>
        )}
        {singletonSource}
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            <Trans id="stake.balance">Balance</Trans>
            <TextInfoTooltip
              singleton={singleton}
              content={i18n._("stake.balance.tooltip")}
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder={`NOT CONNECTED`}
            >
              <span>{trimWithPlaceholder(balances?.klima, 4)}</span> KLIMA
            </WithPlaceholder>
          </div>
        </li>

        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            <Trans id="stake.staked">Staked</Trans>
            <TextInfoTooltip
              singleton={singleton}
              content={i18n._("stake.staked.tooltip")}
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder={`NOT CONNECTED`}
            >
              <span>{trimWithPlaceholder(balances?.sklima, 4)}</span> sKLIMA
            </WithPlaceholder>
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            <Trans id="stake.rebase_rate">Rebase rate</Trans>
            <TextInfoTooltip
              singleton={singleton}
              content={i18n._("stake.rebase_rate.tooltip")}
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <span>{trimWithPlaceholder(nextRebasePercent, 2)}</span>%
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            <Trans id="stake.rebase_value">Rebase value</Trans>
            <TextInfoTooltip
              singleton={singleton}
              content={i18n._("stake.rebase_value.tooltip")}
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <span>{trimWithPlaceholder(nextRebaseValue, 2)}</span> sKLIMA
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            <Trans id="stake.time_until_rebase">Time until rebase</Trans>
            <TextInfoTooltip
              singleton={singleton}
              content={i18n._("stake.time_until_rebase.tooltip")}
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <span>{timeUntilRebase()}</span>
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            <Trans id="stake.roi">ROI (5-day rate)</Trans>
            <TextInfoTooltip
              singleton={singleton}
              content={i18n._("stake.roi.tooltip")}
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <span>{trimWithPlaceholder(fiveDayRatePercent, 2)}</span>%
          </div>
        </li>

        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            <Trans id="stake.apy">APY</Trans>
            <TextInfoTooltip
              singleton={singleton}
              content={i18n._("stake.apy.tooltip")}
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <span>{trimWithPlaceholder(stakingAPYPercent, 2)}</span>%
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            <Trans id="stake.current_index">Current index</Trans>
            <TextInfoTooltip
              singleton={singleton}
              content={i18n._("stake.current_index.tooltip")}
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <span>{trimWithPlaceholder(currentIndex, 4)}</span> KLIMA
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
  );
};
