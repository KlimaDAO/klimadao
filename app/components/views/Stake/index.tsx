import React, { useState } from "react";
import { useSelector } from "react-redux";
import { providers } from "ethers";
import { setAppState, AppNotificationStatus, TxnStatus } from "state/app";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import LibraryAddOutlined from "@mui/icons-material/LibraryAddOutlined";
import FiberNewRoundedIcon from "@mui/icons-material/FiberNewRounded";

import {
  changeApprovalTransaction,
  changeStakeTransaction,
} from "actions/stake";
import { useAppDispatch } from "state";
import { incrementStake, decrementStake, setStakeAllowance } from "state/user";
import {
  selectAppState,
  selectNotificationStatus,
  selectLocale,
  selectBalances,
  selectStakeAllowance,
} from "state/selectors";

import {
  Anchor,
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import { trimWithPlaceholder, concatAddress } from "@klimadao/lib/utils";
import { Trans, defineMessage } from "@lingui/macro";
import { BalancesCard } from "components/BalancesCard";
import { RebaseCard } from "components/RebaseCard";
import { ImageCard } from "components/ImageCard";

import * as styles from "./styles";
import { urls } from "@klimadao/lib/constants";

interface ButtonProps {
  label: React.ReactElement | string;
  onClick: undefined | (() => void);
  disabled: boolean;
}

interface Props {
  provider?: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
  loadWeb3Modal: () => void;
}

const inputPlaceholderMessage = {
  stake: defineMessage({
    id: "stake.inputplaceholder.stake",
    message: "Amount to stake",
  }),
  unstake: defineMessage({
    id: "stake.inputplaceholder.unstake",
    message: "Amount to unstake",
  }),
};

export const Stake = (props: Props) => {
  const locale = useSelector(selectLocale);

  const dispatch = useAppDispatch();
  const [view, setView] = useState<"stake" | "unstake">("stake");
  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus && fullStatus.statusType;

  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  const [quantity, setQuantity] = useState("");

  const { fiveDayRate, currentIndex, stakingAnnualPercent } =
    useSelector(selectAppState);

  const stakeAllowance = useSelector(selectStakeAllowance);
  const balances = useSelector(selectBalances);

  const isLoading =
    !stakeAllowance || typeof stakeAllowance.klima === "undefined";

  const fiveDayRatePercent = fiveDayRate && fiveDayRate * 100;
  const stakingAKR = stakingAnnualPercent && stakingAnnualPercent * 100;

  const setMax = () => {
    setStatus(null);
    if (view === "stake") {
      setQuantity(balances?.klima ?? "0");
    } else {
      setQuantity(balances?.sklima ?? "0");
    }
  };

  const handleApproval = (action: "stake" | "unstake") => async () => {
    if (!props.provider) return;
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
    if (!props.provider) return;
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

  const insufficientBalance = (action: "stake" | "unstake") => {
    const token = action === "stake" ? "klima" : "sklima";
    return (
      props.isConnected &&
      !isLoading &&
      Number(quantity) > Number(balances?.[token] ?? "0")
    );
  };

  const hasApproval = (action: "stake" | "unstake") => {
    if (action === "stake") {
      return (
        stakeAllowance &&
        !!Number(stakeAllowance) &&
        Number(quantity) <= Number(stakeAllowance) // Caution: Number trims values down to 17 decimal places of precision
      );
    }
    if (action === "unstake")
      return (
        unstakeAllowance &&
        !!Number(unstakeAllowance) &&
        Number(quantity) <= Number(unstakeAllowance) // Caution: Number trims values down to 17 decimal places of precision
      );
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
    } else if (!value) {
      return {
        label: <Trans id="shared.enter_quantity">ENTER QUANTITY</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (value && insufficientBalance(view)) {
      return {
        label: (
          <Trans id="shared.insufficient_balance">INSUFFICIENT BALANCE</Trans>
        ),
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
        disabled: !value,
      };
    } else if (view === "unstake" && !hasApproval("unstake")) {
      return {
        label: <Trans id="shared.approve">Approve</Trans>,
        onClick: handleApproval("unstake"),
        disabled: !value,
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

  const showSpinner =
    props.isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  return (
    <>
      <BalancesCard
        assets={["klima", "sklima"]}
        tooltip={
          <Trans id="stake.balancescard.tooltip" comment="Long sentence">
            Stake your KLIMA tokens to receive sKLIMA. After every rebase, your
            sKLIMA balance will increase by the given percentage.
          </Trans>
        }
      />
      <RebaseCard isConnected={props.isConnected} />

      <div className={styles.stakeCard}>
        <div className={styles.stakeCard_header}>
          <Text t="h4" className={styles.stakeCard_header_title}>
            <LibraryAddOutlined />
            <Trans id="stake.stake_klima">Stake KLIMA</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans id="stake.stake_hold_earn">
              Stake, hold, and earn compounding sKLIMA.
            </Trans>
          </Text>
          <Text t="caption" color="lightest">
            <FiberNewRoundedIcon className="new-releases-icon" />
            <Trans id="stake.lifi">
              Cross-chain staking is now available through{" "}
              <Anchor href={urls.lifiStake}>LI.FI</Anchor>, with support for
              dozens of tokens like ETH, BNB and DAI.
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
              <Trans
                id={inputPlaceholderMessage[view].id}
                render={({ translation }) => (
                  <input
                    className={styles.stakeInput_input}
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setStatus(null);
                    }}
                    type="number"
                    placeholder={translation as string}
                    min="0"
                  />
                )}
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
              <Trans id="stake.5_day_rewards">5 Day Rewards</Trans>
              <TextInfoTooltip
                content={
                  <Trans
                    id="stake.5_day_rewards.tooltip"
                    comment="Long sentence"
                  >
                    Approximate rewards, including compounding, should you
                    remain staked for 5 days.
                  </Trans>
                }
              >
                <InfoOutlined />
              </TextInfoTooltip>
            </div>
            <div className={styles.infoTable_label}>
              <Trans id="stake.akr">AKR</Trans>
              <TextInfoTooltip
                content={
                  <Trans id="stake.akr.tooltip" comment="Long sentence">
                    Annualized KLIMA Rewards, including compounding, should the
                    current reward rate remain unchanged for 12 months (reward
                    rate may be subject to change).
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
                  <Trans id="stake.index.tooltip" comment="Long sentence">
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
                trimWithPlaceholder(fiveDayRatePercent, 2, locale) + "%"
              ) : (
                <Trans id="shared.loading">Loading...</Trans>
              )}
            </div>
            <div className={styles.infoTable_value}>
              {stakingAKR ? (
                trimWithPlaceholder(stakingAKR, 0, locale) + "%"
              ) : (
                <Trans id="shared.loading">Loading...</Trans>
              )}
            </div>
            <div className={styles.infoTable_value}>
              {currentIndex ? (
                trimWithPlaceholder(currentIndex, 2, locale) + " sKLIMA"
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

      <ImageCard />
    </>
  );
};
