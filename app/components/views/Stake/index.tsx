import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { providers } from "ethers";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { SvgIcon } from "@mui/material";

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
  trimWithPlaceholder,
  concatAddress,
} from "@klimadao/lib/utils";
import T from "@klimadao/lib/theme/typography.module.css";
import styles from "./index.module.css";
import { Trans } from "@lingui/macro";
import { i18n } from "@lingui/core";
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
    if (currentBlock && rebaseBlock && locale) {
      const seconds = secondsUntilBlock(currentBlock, rebaseBlock);
      return prettifySeconds(locale, seconds);
    }
  };

  const showRelevantBalance = () => {
    if (view === "stake") return trimWithPlaceholder(balances?.klima, 4);

    if (view === "unstake") return trimWithPlaceholder(balances?.sklima, 4);
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
        children: value ? (
          <Trans id="button.stake">Stake Klima</Trans>
        ) : (
          <Trans>Enter Amount</Trans>
        ),
        onClick: handleStake("stake"),
        disabled: !balances?.klima || !value || value > Number(balances.klima),
      };
    } else if (view === "unstake" && hasApproval("unstake")) {
      return {
        children: value ? (
          <Trans id="button.unstake">Unstake Klima</Trans>
        ) : (
          <Trans>Enter Amount</Trans>
        ),
        onClick: handleStake("unstake"),
        disabled:
          !balances?.sklima || !value || value > Number(balances.sklima),
      };
    } else {
      return { children: "ERROR", onClick: undefined, disabled: true };
    }
  };
  const getAction = () => {
    if (view === "stake") {
      return `Amount to Stake`;
    } else {
      return `Amount to Unstake`;
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
        <h2 className={T.h5}>
          <SvgIcon component={AddToPhotosOutlinedIcon} fontSize="inherit" />{" "}
          Stake Klima
        </h2>
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

        <div className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            <Trans>BALANCE</Trans>
            <TextInfoTooltip
              singleton={singleton}
              content={i18n._("stake.balance.tooltip")}
            >
              <div tabIndex={0} className={styles.infoIconWrapper}>
                <InfoOutlined />
              </div>
            </TextInfoTooltip>
          </div>
          <div className={styles.klimaBalanceBar}>
            <WithPlaceholder
              condition={!isConnected}
              placeholder={`NOT CONNECTED`}
            >
              <span>{showRelevantBalance()}</span>
              <span>{view === "unstake" && "s"}KLIMA</span>
            </WithPlaceholder>
          </div>
        </div>

        <div className={styles.dataContainer_label}>STAKE KLIMA</div>

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

      {address && (
        <div className={styles.dataContainer_address}>
          {concatAddress(address)}
        </div>
      )}
      <ul className={styles.dataContainer}>
        {singletonSource}
        <li className={styles.dataContainer_row}>
          <div className={styles.dataContainer_label}>
            {/* <Trans id="stake.roi">ROI</Trans> */}
            <Trans>ROI</Trans>
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
            <Trans>CURRENT INDEX</Trans>
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
        {showSpinner ? (
          <div className={styles.buttonRow_spinner}>
            <Spinner />
          </div>
        ) : (
          <button
            type="button"
            className={styles.submitButton}
            {...getButtonProps()}
          />
        )}
      </div>
    </div>
  );
};
