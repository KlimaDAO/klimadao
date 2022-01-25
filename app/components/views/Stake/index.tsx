import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { providers } from "ethers";
import { selectNotificationStatus } from "state/selectors";
import { setAppState, AppNotificationStatus, TxnStatus } from "state/app";
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

import {
  Spinner,
  TextInfoTooltip,
  useTooltipSingleton,
} from "@klimadao/lib/components";
import {
  secondsUntilBlock,
  trimWithPlaceholder,
  concatAddress,
} from "@klimadao/lib/utils";
import t from "@klimadao/lib/theme/typography.module.css";
import styles from "./index.module.css";
import { Trans } from "@lingui/macro";
import { prettifySeconds } from "lib/i18n";

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
  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus && fullStatus.statusType;

  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  const [quantity, setQuantity] = useState("");
  const [singletonSource, singleton] = useTooltipSingleton();

  const {
    fiveDayRate,
    currentIndex,
    stakingRebase,
    stakingAPY,
    currentBlock,
    rebaseBlock,
    locale,
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
    setStatus(null);
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
    if (currentBlock && rebaseBlock && locale) {
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
              setStatus(null);
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
              setStatus(null);
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
              setStatus(null);
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

      <ul className={styles.dataContainer}>
        {address && (
          <li className={styles.dataContainer_address}>
            {concatAddress(address)}
          </li>
        )}
        {singletonSource}
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            Balance
            <TextInfoTooltip
              singleton={singleton}
              content="Unstaked KLIMA, not generating interest"
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.klima, 4)}</span> KLIMA
            </WithPlaceholder>
          </div>
        </li>

        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            Staked
            <TextInfoTooltip
              singleton={singleton}
              content="Staked KLIMA generating interest"
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder="NOT CONNECTED"
            >
              <span>{trimWithPlaceholder(balances?.sklima, 4)}</span> sKLIMA
            </WithPlaceholder>
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            Rebase rate
            <TextInfoTooltip
              singleton={singleton}
              content="Percent interest to be rewarded at next rebase"
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
            Rebase value
            <TextInfoTooltip
              singleton={singleton}
              content="Approximate amount of sKLIMA you will receive at next rebase"
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.dataContainer_value}>
            <span>{trimWithPlaceholder(nextRebaseValue, 5)}</span> sKLIMA
          </div>
        </li>
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            <Trans>Next rebase (est.)</Trans>
            <TextInfoTooltip
              singleton={singleton}
              content="Approximate time remaining until next rewards distribution"
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
            ROI (5-day rate)
            <TextInfoTooltip
              singleton={singleton}
              content="Approximate return on investment, including compounding interest, should you remain staked for 5 days."
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
            APY
            <TextInfoTooltip
              singleton={singleton}
              content="Annual Percentage Yield, including compounding interest, should the current reward rate remain unchanged for 12 months (rates may be subject to change)"
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
            Current index
            <TextInfoTooltip
              singleton={singleton}
              content="Amount you would have today if you staked 1 KLIMA on launch day. Useful for accounting purposes."
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
    </div>
  );
};
