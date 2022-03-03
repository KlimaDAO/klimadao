import React, { useState } from "react";
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
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import { trimWithPlaceholder, concatAddress } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { BalancesCard } from "components/BalancesCard";
import { RebaseCard } from "components/RebaseCard";
import LibraryAddOutlined from "@mui/icons-material/LibraryAddOutlined";

import * as styles from "./styles";
import { ImageCard } from "components/ImageCard";

interface ButtonProps {
  label: React.ReactElement | string;
  onClick: undefined | (() => void);
  disabled: boolean;
}

interface Props {
  provider: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
  loadWeb3Modal: () => void;
}

export const Stake = (props: Props) => {
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

  const { fiveDayRate, currentIndex, stakingAPY } = useSelector(selectAppState);

  const stakeAllowance = useSelector(selectStakeAllowance);
  const balances = useSelector(selectBalances);

  const isLoading =
    !stakeAllowance || typeof stakeAllowance.klima === "undefined";

  const fiveDayRatePercent = fiveDayRate && fiveDayRate * 100;
  const stakingAPYPercent = stakingAPY && stakingAPY * 100;

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
        provider: props.provider,
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
        provider: props.provider,
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

  const getButtonProps = (): ButtonProps => {
    const value = Number(quantity || "0");
    if (!props.isConnected || !props.address) {
      return {
        label: <Trans id="shared.connect_wallet">Connect wallet</Trans>,
        onClick: props.loadWeb3Modal,
        disabled: false,
      };
    } else if (isLoading) {
      return {
        label: <Trans id="shared.loading">Loading...</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (
      status === "userConfirmation" ||
      status === "networkConfirmation"
    ) {
      return {
        label: <Trans id="shared.confirming">Confirming</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (view === "stake" && !hasApproval("stake")) {
      return {
        label: <Trans id="shared.approve">Approve</Trans>,
        onClick: handleApproval("stake"),
        disabled: false,
      };
    } else if (view === "unstake" && !hasApproval("unstake")) {
      return {
        label: <Trans id="shared.approve">Approve</Trans>,
        onClick: handleApproval("unstake"),
        disabled: false,
      };
    } else if (view === "stake" && hasApproval("stake")) {
      return {
        label: value ? (
          <Trans id="stake.stake_klima">Stake KLIMA</Trans>
        ) : (
          <Trans id="shared.enter_amount">Enter Amount</Trans>
        ),
        onClick: handleStake("stake"),
        disabled: !balances?.klima || !value || value > Number(balances.klima),
      };
    } else if (view === "unstake" && hasApproval("unstake")) {
      return {
        label: value ? (
          <Trans id="stake.unstake_klima">Unstake KLIMA</Trans>
        ) : (
          <Trans id="shared.enter_amount">Enter Amount</Trans>
        ),
        onClick: handleStake("unstake"),
        disabled:
          !balances?.sklima || !value || value > Number(balances.sklima),
      };
    } else {
      return {
        label: <Trans id="shared.error">ERROR</Trans>,
        onClick: undefined,
        disabled: true,
      };
    }
  };

  const getInputPlaceholder = (): string => {
    if (view === "stake") {
      return t({
        id: "stake.inputplaceholder.stake",
        message: "Amount to stake",
      });
    } else if (view === "unstake") {
      return t({
        id: "stake.inputplaceholder.unstake",
        message: "Amount to unstake",
      });
    } else {
      return t({ id: "shared.error", message: "ERROR" });
    }
  };

  const showSpinner =
    props.isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  return (
    <>
      <BalancesCard
        assets={["klima", "sklima"]}
        tooltip={t({
          id: "stake.balancescard.tooltip",
          message:
            "Stake your KLIMA tokens to receive sKLIMA. After every rebase, your sKLIMA balance will increase by the given percentage.",
        })}
      />
      <div className={styles.stakeCard}>
        <div className={styles.stakeCard_header}>
          <Text t="h4" className={styles.stakeCard_header_title}>
            <LibraryAddOutlined />
            <Trans id="stake.stake_klima">Stake KLIMA</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans id="stake.caption">
              Hold, stake, and compound. If the protocol earns a profit selling
              carbon bonds, these rewards are shared among all holders of staked
              KLIMA (sKLIMA).
            </Trans>
          </Text>
        </div>
        <div className={styles.stakeCard_ui}>
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
                <Trans id="stake.stake">Stake</Trans>
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
                <Trans id="stake.unstake">Unstake</Trans>
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
                placeholder={getInputPlaceholder()}
                min="0"
              />
              <button
                className={styles.stakeInput_max}
                type="button"
                onClick={setMax}
              >
                <Trans id="shared.max">Max</Trans>
              </button>
            </div>
            {props.address && (
              <div className={styles.address}>
                {concatAddress(props.address)}
              </div>
            )}
            <div className="hr" />
          </div>

          <div className={styles.infoTable}>
            <div className={styles.infoTable_label}>
              <Trans id="stake.5_day_roi">5-day ROI</Trans>
              <TextInfoTooltip
                content={
                  <Trans id="stake.5_day_roi.tooltip">
                    Approximate return on investment, including compounding
                    interest, should you remain staked for 5 days.
                  </Trans>
                }
              >
                <InfoOutlined />
              </TextInfoTooltip>
            </div>
            <div className={styles.infoTable_label}>
              <Trans id="stake.apy">APY</Trans>
              <TextInfoTooltip
                content={
                  <Trans id="stake.apy.tooltip">
                    Annual Percentage Yield, including compounding interest,
                    should the current reward rate remain unchanged for 12
                    months (rates may be subject to change)
                  </Trans>
                }
              >
                <InfoOutlined />
              </TextInfoTooltip>
            </div>
            <div className={styles.infoTable_label}>
              <Trans id="stake.index">Index</Trans>
              <TextInfoTooltip
                content={
                  <Trans id="stake.index.tooltip">
                    Amount of KLIMA you would have today if you staked 1 KLIMA
                    on launch day. Useful for accounting purposes.
                  </Trans>
                }
              >
                <InfoOutlined />
              </TextInfoTooltip>
            </div>
            <div className={styles.infoTable_value}>
              {fiveDayRatePercent ? (
                trimWithPlaceholder(fiveDayRatePercent, 2) + "%"
              ) : (
                <Trans id="shared.loading">Loading...</Trans>
              )}
            </div>
            <div className={styles.infoTable_value}>
              {stakingAPYPercent ? (
                trimWithPlaceholder(stakingAPYPercent, 0) + "%"
              ) : (
                <Trans id="shared.loading">Loading...</Trans>
              )}
            </div>
            <div className={styles.infoTable_value}>
              {currentIndex ? (
                trimWithPlaceholder(currentIndex, 2) + " sKLIMA"
              ) : (
                <Trans id="shared.loading">Loading...</Trans>
              )}
            </div>
          </div>

          <div className={styles.buttonRow}>
            {showSpinner ? (
              <div className={styles.buttonRow_spinner}>
                <Spinner />
              </div>
            ) : (
              <ButtonPrimary
                {...getButtonProps()}
                className={styles.submitButton}
              />
            )}
          </div>
        </div>
      </div>
      <RebaseCard isConnected={props.isConnected} />
      <ImageCard />
    </>
  );
};
