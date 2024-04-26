import InfoOutlined from "@mui/icons-material/InfoOutlined";
import LibraryAddOutlined from "@mui/icons-material/LibraryAddOutlined";
import { providers } from "ethers";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppNotificationStatus, setAppState, TxnStatus } from "state/app";

import { changeStakeTransaction } from "actions/stake";
import { changeApprovalTransaction } from "actions/utils";
import { useAppDispatch } from "state";

import { useTypedSelector } from "lib/hooks/useTypedSelector";
import {
  selectAllowancesWithParams,
  selectAppState,
  selectBalances,
  selectLocale,
  selectNotificationStatus,
} from "state/selectors";
import {
  decrementAllowance,
  decrementStake,
  incrementStake,
  setAllowance,
} from "state/user";

import {
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import { concatAddress, trimWithPlaceholder } from "@klimadao/lib/utils";
import { defineMessage, t, Trans } from "@lingui/macro";
import { BalancesCard } from "components/BalancesCard";
import { ImageCard } from "components/ImageCard";
import { RebaseCard } from "components/RebaseCard";
import { TransactionModal } from "components/TransactionModal";

import { addresses } from "@klimadao/lib/constants";
import { DisclamerModal } from "components/DisclaimerModal";
import { tokenInfo } from "lib/getTokenInfo";
import * as styles from "./styles";

interface Props {
  provider?: providers.JsonRpcProvider;
  address?: string;
  isConnected: boolean;
  toggleModal: () => void;
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
  const [quantity, setQuantity] = useState("");
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus && fullStatus.statusType;

  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  const { fiveDayRate, currentIndex, stakingAnnualPercent } =
    useSelector(selectAppState);

  const stakeAllowance = useTypedSelector((state) =>
    selectAllowancesWithParams(state, {
      tokens: ["klima"],
      spender: "staking_helper",
    })
  );
  const unstakeAllowance = useTypedSelector((state) =>
    selectAllowancesWithParams(state, {
      tokens: ["sklima"],
      spender: "staking",
    })
  );

  const balances = useSelector(selectBalances);

  const getToken = () => {
    if (view === "stake") {
      return "klima";
    } else {
      return "sklima";
    }
  };

  const getSpender = () => {
    if (view === "stake") {
      return "staking_helper";
    } else {
      return "staking";
    }
  };

  const getAllowance = () => {
    if (view === "stake") {
      return stakeAllowance?.klima;
    } else {
      return unstakeAllowance?.sklima;
    }
  };

  const isLoading = !getAllowance();

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

  const closeModal = () => {
    setStatus(null);
    setShowTransactionModal(false);
  };

  const handleApproval = async () => {
    if (!props.provider) return;
    const token = getToken();
    const spender = getSpender();

    try {
      const currentQuantity = quantity.toString();
      const approvedValue = await changeApprovalTransaction({
        value: currentQuantity,
        provider: props.provider,
        token,
        spender,
        onStatus: setStatus,
      });

      dispatch(
        setAllowance({
          token,
          spender,
          value: approvedValue,
        })
      );
    } catch (e) {
      console.error("Error in handleApproval", e);
      return;
    }
  };

  const handleStake = async () => {
    if (!props.provider) return;
    try {
      const value = quantity.toString();
      const approvedValue = await changeStakeTransaction({
        value,
        provider: props.provider,
        action: view,
        onStatus: setStatus,
      });
      dispatch(
        view === "stake"
          ? incrementStake(approvedValue)
          : decrementStake(approvedValue)
      );
      dispatch(
        view === "stake"
          ? decrementAllowance({
              token: "klima",
              spender: "staking_helper",
              value: approvedValue,
            })
          : decrementAllowance({
              token: "sklima",
              spender: "staking",
              value: approvedValue,
            })
      );
      setQuantity("");
    } catch (e) {
      console.error("Error in handleStake", e);
      return;
    }
  };

  const insufficientBalance = () => {
    const token = getToken();
    return (
      props.isConnected &&
      !isLoading &&
      Number(quantity) > Number(balances?.[token] ?? "0")
    );
  };

  const hasApproval = () => {
    const allowance = getAllowance();
    return (
      !!allowance &&
      !!Number(allowance) &&
      Number(quantity) <= Number(allowance) // Caution: Number trims values down to 17 decimal places of precision
    );
  };

  const getButtonProps = () => {
    const value = Number(quantity || "0");
    if (!props.isConnected || !props.address) {
      return {
        label: t({
          id: "shared.login_connect",
          message: "Login / Connect",
        }),
        onClick: props.toggleModal,
      };
    } else if (isLoading) {
      return {
        label: t({ message: "Loading...", id: "shared.connect_wallet" }),
        disabled: true,
      };
    } else if (!value) {
      return {
        label: t`Enter quantity`,
        disabled: true,
      };
    } else if (value && insufficientBalance()) {
      return {
        label: t`Insufficient balance`,
        disabled: true,
      };
    } else if (!hasApproval()) {
      return {
        label: t`Approve`,
        onClick: () => setShowTransactionModal(true),
      };
    } else if (view === "stake") {
      return {
        label: value
          ? t({ id: "stake.stake_klima", message: "Stake KLIMA" })
          : t({ id: "shared.enter_amount", message: "Enter Amount" }),

        onClick: () => setShowTransactionModal(true),
        disabled: !balances?.klima || !value || value > Number(balances.klima),
      };
    } else if (view === "unstake") {
      return {
        label: value
          ? t({ id: "stake.unstake_klima", message: "Unstake KLIMA" })
          : t({ id: "shared.enter_amount", message: "Enter Amount" }),

        onClick: () => setShowTransactionModal(true),
        disabled:
          !balances?.sklima || !value || value > Number(balances.sklima),
      };
    } else {
      return {
        label: t({ id: "shared.error", message: "ERROR" }),
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
      <DisclamerModal />
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
                trimWithPlaceholder(fiveDayRatePercent, 3, locale) + "%"
              ) : (
                <Trans>Loading...</Trans>
              )}
            </div>
            <div className={styles.infoTable_value}>
              {stakingAKR ? (
                trimWithPlaceholder(stakingAKR, 2, locale) + "%"
              ) : (
                <Trans>Loading...</Trans>
              )}
            </div>
            <div className={styles.infoTable_value}>
              {currentIndex ? (
                trimWithPlaceholder(currentIndex, 2, locale) + " sKLIMA"
              ) : (
                <Trans>Loading...</Trans>
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
                className={styles.submitButton}
                {...getButtonProps()}
              />
            )}
          </div>
        </div>
      </div>

      {showTransactionModal && (
        <TransactionModal
          title={
            <Text t="h4" className={styles.stakeCard_header_title}>
              <LibraryAddOutlined />
              {view === "stake" ? (
                <Trans id="stake.stake_klima">Stake KLIMA</Trans>
              ) : (
                <Trans id="stake.unstake_klima">Unstake KLIMA</Trans>
              )}
            </Text>
          }
          onCloseModal={closeModal}
          tokenName={getToken()}
          tokenIcon={tokenInfo[getToken()].icon}
          spenderAddress={addresses["mainnet"][getSpender()]}
          value={quantity.toString()}
          status={fullStatus}
          onResetStatus={() => setStatus(null)}
          onApproval={handleApproval}
          hasApproval={hasApproval()}
          onSubmit={handleStake}
        />
      )}
      <ImageCard />
    </>
  );
};
