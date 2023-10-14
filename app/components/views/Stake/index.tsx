import FiberNewRoundedIcon from "@mui/icons-material/FiberNewRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import LibraryAddOutlined from "@mui/icons-material/LibraryAddOutlined";
import { providers } from "ethers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Etherspot } from "@etherspot/react-transaction-buidler";
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
  Anchor,
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
} from "@klimadao/lib/components";
import { concatAddress, trimWithPlaceholder, useWeb3 } from "@klimadao/lib/utils";
import { defineMessage, t, Trans } from "@lingui/macro";
import { BalancesCard } from "components/BalancesCard";
import { ImageCard } from "components/ImageCard";
import { RebaseCard } from "components/RebaseCard";
import { TransactionModal } from "components/TransactionModal";

import { addresses } from "@klimadao/lib/constants";
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

const klimaTheme = {
  color: {
    background: {
      main: 'transparent',
      card: 'var(--surface-03)',
      cardBorder: 'var(--surface-03)',
      tokenBalanceContainer: '#21002e',
      horizontalLine: 'linear-gradient(90deg, #23a9c9, #cd34a2)',
      topMenu: '#fff',
      topMenuWallet: 'rgba(255, 247, 242, 0.24)',
      topMenuButton: '#fff',
      selectInput: 'var(--surface-02)',
      selectInputExpanded: 'var(--surface-02)',
      selectInputScrollbar: 'var(--klima-green)',
      selectInputScrollbarHover: 'var(--klima-green)',
      selectInputScrollbarActive: 'var(--klima-green)',
      selectInputImagePlaceholder: '#ffe6d9',
      selectInputToggleButton: '#fff',
      selectInputBorder: '#fff',
      selectInputExpandedBorder: 'transparent',
      textInputBorder: 'transparent',
      textInput: 'var(--surface-02)',
      switchInput: 'var(--surface-02)',
      switchInputActiveTab: 'var(--klima-green)',
      switchInputInactiveTab: 'transparent',
      button: 'var(--klima-green)',
      closeButton: '#fff',
      pill: 'var(--surface-03)',
      roundedImageFallback: '#ffe6d9',
      listItemQuickButtonSecondary: '#443d66',
      listItemQuickButtonPrimary: 'var(--klima-green)',
      statusIconSuccess: '#1ba23d',
      statusIconPending: '#ff6b35',
      statusIconFailed: '#ff0000',
      checkboxInputActive: 'var(--klima-green)',
      checkboxInputInactive: '#7f7a99',
      dropdownHoverColor: 'var(--surface-02)',
      selectInputExpandedHover: 'var(--surface-03)',
      toDropdownColor: 'var(--surface-02)',
      secondary: '#9889e4',
      selectInputRadioOn: '#ff7733',
      selectInputRadioOff: 'var(--surface-02)',
      walletButton: 'linear-gradient(to bottom, var(--klima-green), var(--klima-green))',
      walletChainDropdown: 'var(--surface-03)',
      walletChainButtonActive: 'var(--klima-green)',
      deployButton: '#ff884d',
      blockParagraphBorder: 'transparent',
      settingMenuMain: 'linear-gradient(rgb(253, 146, 80), rgb(255, 85, 72))',
      settingsModalBorder: 'transparent',
      settingsModal: '#fff',
      settingsIcon: '#fd9250',
      loadingAnimationBackground: 'var(--surface-03)',
      loadingAnimationForeground: 'var(--surface-02)',
      walletDisplayTypeButtonActive: 'var(--klima-green)',
    },
    text: {
      main: '#fff',
      topBar: '#fff',
      topMenu: '#fff',
      topMenuWallet: '#fff',
      cardTitle: '#fff',
      card: '#fff',
      cardDisabled: '#ddd',
      innerLabel: '#fff',
      outerLabel: '#fff',
      selectInput: '#fff',
      selectInputOption: '#fff',
      selectInputOptionSecondary: '#fff',
      selectInputImagePlaceholder: '#fff',
      textInput: '#fff',
      textInputSecondary: 'var(--font-03)',
      switchInputActiveTab: '#fff',
      switchInputInactiveTab: '#fff',
      button: '#fff',
      buttonSecondary: '#ffeee6',
      errorMessage: '#ff3c00',
      searchInput: '#fff',
      searchInputSecondary: '#fff',
      pill: '#fff',
      pillValue: '#fff',
      roundedImageFallback: '#fff',
      listItemQuickButtonSecondary: '#fff',
      listItemQuickButtonPrimary: '#fff',
      transactionStatusLink: 'var(--klima-green)',
      pasteIcon: 'var(--klima-green)',
      walletDropdownIcon: '#fff',
      settingsModalSubHeader: '#fff',
      settingsMenuItem: '#000',
      settingsMenuItemHover: 'var(--klima-green)',
      searchIcon: 'var(--klima-green)',
    },
  },
};

export const Stake = (props: Props) => {
  const locale = useSelector(selectLocale);

  const dispatch = useAppDispatch();
  const [view, setView] = useState<"stake" | "unstake">("stake");
  const [quantity, setQuantity] = useState("");
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showEtherspotBuidler, setShowEtherspotBuidler] = useState(false);

  const { disconnect, setIgnoreChainId } = useWeb3();

  useEffect(() => {
    if (setIgnoreChainId) setIgnoreChainId(showEtherspotBuidler);
  }, [showEtherspotBuidler]);

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
              <Anchor>LI.FI and Etherspot</Anchor>, with
              support for multiple chains and tokens.
            </Trans>
            <ButtonPrimary
              className={styles.etherspotSwitchButton}
              label={<Trans id="stake.switch_to_etherspot">Stake cross-chain</Trans>}
              onClick={() => setShowEtherspotBuidler(true)}
            />
          </Text>
        </div>

        {showEtherspotBuidler && (
          <>
            {!props.provider && (
              <div className={styles.stakeCard_ui}>
                <ButtonPrimary
                  className={styles.submitButton}
                  {...getButtonProps()}
                />
              </div>
            )}
            {!!props.provider && typeof window !== undefined && (
              <div className={styles.etherspotStakeCard_ui}>
                {showEtherspotBuidler && (
                  <Text
                    t="button"
                    onClick={() => setShowEtherspotBuidler(false)}
                    className={styles.toggle_form_type}
                  >
                    &larr; Show Regular Staking
                  </Text>
                )}
                <Etherspot
                  provider={(props.provider as any).provider}
                  chainId={137}
                  themeOverride={klimaTheme}
                  onLogout={async () => {
                    try {
                      if (props.isConnected && disconnect) disconnect();
                    } catch (e) {
                      //
                    }
                  }}
                  defaultTransactionBlocks={[{ type: "KLIMA_STAKE", closeable: false }]}
                  hideTransactionBlockTitle
                  hideAddTransactionButton
                  hideAddButton
                  hideSettingsButton
                  hideWalletBlock
                  walletBlockActionsReplaceBehaviour
                />
              </div>
            )}
          </>
        )}

        {!showEtherspotBuidler && (
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
                  <Trans>Loading...</Trans>
                )}
              </div>
              <div className={styles.infoTable_value}>
                {stakingAKR ? (
                  trimWithPlaceholder(stakingAKR, 0, locale) + "%"
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
        )}
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
