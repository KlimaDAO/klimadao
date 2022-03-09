import React, { useState, useEffect, FC } from "react";
import { useSelector } from "react-redux";
import LeftOutlined from "@mui/icons-material/KeyboardArrowLeftRounded";
import { Link } from "react-router-dom";
import { setAppState, AppNotificationStatus, TxnStatus } from "state/app";
import { selectNotificationStatus } from "state/selectors";

import {
  changeApprovalTransaction,
  bondTransaction,
  redeemTransaction,
  calcBondDetails,
  calculateUserBondDetails,
} from "actions/bonds";

import { Trans, t } from "@lingui/macro";
import { prettifySeconds } from "lib/i18n";

import { useBond } from "../ChooseBond";
import { Bond as BondType } from "@klimadao/lib/constants";
import {
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
  useTooltipSingleton,
} from "@klimadao/lib/components";
import {
  useDebounce,
  trimWithPlaceholder,
  secondsUntilBlock,
  concatAddress,
  safeSub,
  safeAdd,
} from "@klimadao/lib/utils";
import { providers } from "ethers";
import { selectAppState, selectBondAllowance } from "state/selectors";
import { RootState, useAppDispatch } from "state";
import { setBondAllowance } from "state/user";
import { redeemBond, setBond } from "state/bonds";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { ImageCard } from "components/ImageCard";

import * as styles from "./styles";
import { TippyProps } from "@tippyjs/react";
import { BondBalancesCard } from "components/BondBalancesCard";

export function prettyVestingPeriod(
  locale: string | undefined,
  currentBlock: number,
  vestingBlock: number,
  blockRate: number
) {
  if (vestingBlock === 0) {
    return "";
  }

  const seconds = secondsUntilBlock(currentBlock, vestingBlock, blockRate);
  if (seconds < 0) {
    return "Fully Vested";
  }
  return prettifySeconds(seconds);
}

interface DataRowProps {
  unit: string;
  label: string;
  tooltip: string;
  warning: boolean;
  value: number | string;
  singleton: TippyProps["singleton"];
}

export const DataRow: FC<DataRowProps> = (props) => {
  return (
    <li className={styles.dataContainer_row}>
      <div className={styles.dataContainer_label}>
        <Text t="caption" style={{ textAlign: "end" }}>
          {props.label}
        </Text>
        <TextInfoTooltip content={props.tooltip} singleton={props.singleton}>
          <div tabIndex={0} className={styles.infoIconWrapper}>
            <InfoOutlined />
          </div>
        </TextInfoTooltip>
      </div>
      <div className={styles.dataContainer_value}>
        <span data-warning={props.warning}>{props.value}</span>
        {/* hackyfix. TODO: get rid of trimWithPlaceholder pattern and use a prop instead */}
        {props.value === "Loading... " ? "" : props.unit}
      </div>
    </li>
  );
};

interface ButtonProps {
  label: React.ReactElement | string;
  onClick: undefined | (() => void);
  disabled: boolean;
}

interface Props {
  provider: providers.JsonRpcProvider;
  address?: string;
  bond: BondType;
  isConnected?: boolean;
  loadWeb3Modal: () => void;
}

export const Bond: FC<Props> = (props) => {
  const bondInfo = useBond(props.bond);

  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus && fullStatus.statusType;

  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  const dispatch = useAppDispatch();

  const [view, setView] = useState("bond");
  const [quantity, setQuantity] = useState("");
  const debouncedQuantity = useDebounce(quantity, 500);

  const { currentBlock, locale, blockRate } = useSelector(selectAppState);
  const bondState = useSelector((state: RootState) => state.bonds[props.bond]);
  const allowance = useSelector(selectBondAllowance);

  const [sourceSingleton, singleton] = useTooltipSingleton();

  const isLoading = !allowance || quantity !== debouncedQuantity;

  const showSpinner =
    props.isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  const vestingPeriod = () => {
    if (!bondState || !currentBlock || !bondState.vestingTerm) return;
    const vestingBlock = currentBlock + bondState.vestingTerm;
    const seconds = secondsUntilBlock(currentBlock, vestingBlock, blockRate);
    return prettifySeconds(seconds);
  };

  const vestingTime = () => {
    if (!currentBlock || !bondState?.bondMaturationBlock) return;
    return prettyVestingPeriod(
      locale,
      currentBlock,
      bondState.bondMaturationBlock,
      blockRate
    );
  };

  const getBondMax = (): string => {
    if (
      !bondState?.maxBondPrice ||
      !bondState?.bondPrice ||
      !bondState?.balance
    ) {
      return "0";
    }
    const price = bondState?.bondPrice;
    const maxPayable = Number(bondState.maxBondPrice) * Number(price);
    const bondMax =
      Number(bondState?.balance) < Number(maxPayable)
        ? bondState?.balance
        : maxPayable.toString();
    return bondMax;
  };

  const setMax = () => {
    setStatus(null);
    if (view === "bond") {
      setQuantity(getBondMax());
    } else {
      setQuantity(bondState?.pendingPayout ?? "0");
    }
  };

  useEffect(() => {
    async function loadBondDetails() {
      if (props.provider) {
        dispatch(
          calcBondDetails({
            bond: props.bond,
            value: debouncedQuantity,
            provider: props.provider,
          })
        );
      }
      if (props.provider && props.address) {
        dispatch(
          calculateUserBondDetails({
            address: props.address,
            bond: props.bond,
            provider: props.provider,
          })
        );
      }
    }
    loadBondDetails();
  }, [debouncedQuantity, props.address]);

  const handleAllowance = async () => {
    try {
      setStatus(null);
      const value = await changeApprovalTransaction({
        provider: props.provider,
        bond: props.bond,
        onStatus: setStatus,
      });
      dispatch(setBondAllowance({ [props.bond]: value }));
    } catch (e) {
      return;
    }
  };

  const handleBond = async () => {
    try {
      if (
        !props.address ||
        !bondState ||
        !bondState.balance ||
        !bondState.bondQuote ||
        !bondState.interestDue ||
        !bondState.maxBondPrice
      ) {
        return;
      }
      if (
        Number(bondState?.interestDue) > 0 ||
        Number(bondState?.pendingPayout) > 0
      ) {
        const didConfirm = window.confirm(
          "You have an existing bond. Bonding will reset your vesting period and forfeit rewards. We recommend claiming rewards first or using a fresh wallet. Do you still want to proceed?"
        );
        if (!didConfirm) {
          return; // early exit
        }
      }
      await bondTransaction({
        value: quantity,
        slippage: 2,
        bond: props.bond,
        provider: props.provider,
        address: props.address,
        onStatus: setStatus,
      });
      setQuantity("");
      dispatch(
        setBond({
          bond: props.bond,
          balance: safeSub(bondState.balance, bondState.bondQuote),
          interestDue: safeAdd(bondState.interestDue, bondState.bondQuote),
          maxBondPrice: safeSub(bondState.maxBondPrice, bondState.bondQuote),
        })
      );
    } catch (error) {
      return;
    }
  };

  const handleRedeem = async () => {
    try {
      if (!bondState?.pendingPayout || !props.address) return;
      setQuantity("");
      await redeemTransaction({
        address: props.address,
        bond: props.bond,
        provider: props.provider,
        onStatus: setStatus,
      });
      dispatch(
        redeemBond({
          bond: props.bond,
          value: bondState.pendingPayout,
        })
      );
    } catch (e) {
      return;
    }
  };

  const hasAllowance = () => !!allowance && !!Number(allowance[props.bond]);

  const isDisabled = view === "bond" && bondInfo.disabled;

  const getButtonProps = (): ButtonProps => {
    const value = Number(quantity || "0");
    if (isDisabled) {
      return {
        label: <Trans id="shared.sold_out">Sold Out</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (!props.isConnected || !props.address) {
      return {
        label: <Trans id="shared.connect_wallet">Connect wallet</Trans>,
        onClick: props.loadWeb3Modal,
        disabled: false,
      };
    } else if (isLoading) {
      return {
        label: <Trans id="shared.loading">Loading</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (view === "bond" && !value) {
      return {
        label: <Trans id="shared.enter_quantity">Enter Quantity</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (view === "redeem" && !Number(bondState?.pendingPayout)) {
      return {
        label: <Trans id="bond.not_redeemable">Not Redeemable</Trans>,
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
    } else if (!hasAllowance()) {
      return {
        label: <Trans id="shared.approve">Approve</Trans>,
        disabled: false,
        onClick: handleAllowance,
      };
    } else if (view === "bond") {
      const bondMax = getBondMax();
      return {
        label: <Trans id="bond.bond">Bond</Trans>,
        onClick: handleBond,
        disabled: !value || !bondMax || Number(value) > Number(bondMax),
      };
    } else if (view === "redeem") {
      return {
        label: <Trans id="bond.redeem">Redeem</Trans>,
        onClick: handleRedeem,
        disabled: !Number(bondState?.pendingPayout),
      };
    } else {
      // No trans_id tag for Error in stake
      return {
        label: <Trans id="shared.error">ERROR</Trans>,
        onClick: undefined,
        disabled: true,
      };
    }
  };

  const getInputPlaceholder = (): string => {
    if (view === "bond") {
      return t({
        id: "bond.inputplaceholder.amount_to_bond",
        message: "Amount to bond",
      });
    } else if (view === "redeem") {
      return t({
        id: "bond.inputplaceholder.amount_to_redeem",
        message: "Amount to redeem",
      });
    } else {
      return t({ id: "shared.error", message: "ERROR" });
    }
  };

  const isBondDiscountNegative =
    !!bondState?.bondDiscount && bondState?.bondDiscount < 0;

  return (
    <>
      <BondBalancesCard bond={props.bond} />
      <div className={styles.bondCard}>
        <div className={styles.bondCard_header}>
          <Link to="/bonds" className={styles.backButton}>
            <LeftOutlined />
            <Text t="button" color="lighter">
              <Trans id="nav.back">BACK</Trans>
            </Text>
          </Link>
          <img src={bondInfo.icon} alt="" />
          <div>
            <Text t="h5">
              <Trans id="bond.bond_token" comment="Bond {0}">
                Bond {bondInfo.name}
              </Trans>
            </Text>
            <Text t="caption" color="lightest">
              {bondInfo.description}
            </Text>
          </div>
        </div>
        <div className={styles.bondCard_ui}>
          <div className={styles.inputsContainer}>
            <div className={styles.stakeSwitch}>
              <button
                className={styles.switchButton}
                type="button"
                onClick={() => {
                  setView("bond");
                }}
                data-active={view === "bond"}
              >
                <Trans id="bond.bond">Bond</Trans>
              </button>
              <button
                className={styles.switchButton}
                type="button"
                onClick={() => {
                  setView("redeem");
                }}
                data-active={view === "redeem"}
              >
                <Trans id="bond.redeem">Redeem</Trans>
              </button>
            </div>
            <div className={styles.stakeInput}>
              <input
                className={styles.stakeInput_input}
                value={
                  view === "bond"
                    ? quantity || ""
                    : bondState?.pendingPayout || ""
                }
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder={getInputPlaceholder()}
                min="0"
                step={
                  view === "bond" && bondInfo.balanceUnit === "SLP"
                    ? "0.0001"
                    : "1"
                }
                disabled={view === "redeem"}
              />
              <button
                className={styles.stakeInput_max}
                type="button"
                onClick={setMax}
                disabled={view === "redeem"}
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
          {view === "bond" && (
            <ul className={styles.dataContainer}>
              {sourceSingleton}
              <DataRow
                singleton={singleton}
                label={t({
                  id: "bond.balance",
                  message: "Balance",
                })}
                tooltip={t({
                  id: "bond.balance.tooltip",
                  message: "Balance available for bonding",
                  comment: "Long sentence",
                })}
                unit={bondInfo.balanceUnit}
                value={
                  !props.isConnected
                    ? 0
                    : trimWithPlaceholder(
                        bondState?.balance,
                        Number(bondState?.balance) < 1 ? 18 : 2
                      )
                }
                warning={Number(quantity) > Number(bondState?.balance)}
              />
              <DataRow
                singleton={singleton}
                label={t({
                  id: "bond.bond_price",
                  message: "Bond price",
                })}
                tooltip={t({
                  id: "bond.bond_price.tooltip",
                  message:
                    "Discounted price. Total amount to bond 1 full KLIMA (fractional bonds are also allowed)",
                  comment: "Long sentence",
                })}
                unit={bondInfo.priceUnit}
                value={trimWithPlaceholder(bondState?.bondPrice, 2)}
                warning={false}
              />
              <DataRow
                singleton={singleton}
                label={t({
                  id: "bond.market_price",
                  message: "Market price",
                })}
                tooltip={t({
                  id: "bond.market_price.tooltip",
                  message:
                    "Current trading price of KLIMA, without bond discount",
                  comment: "Long sentence",
                })}
                unit={bondInfo.priceUnit}
                value={trimWithPlaceholder(bondState?.marketPrice, 2)}
                warning={false}
              />
              <DataRow
                singleton={singleton}
                label={t({
                  id: "bond.roi",
                  message: "ROI (bond discount)",
                })}
                tooltip={t({
                  id: "bond.roi.tooltip",
                  message:
                    "Return on investment, expressed as a percentage discount on the market value of KLIMA",
                  comment: "Long sentence",
                })}
                unit={"%"}
                value={trimWithPlaceholder(bondState?.bondDiscount, 2)}
                warning={isBondDiscountNegative}
              />
              <DataRow
                singleton={singleton}
                label={t({
                  id: "bond.you_will_get",
                  message: "You will get",
                })}
                tooltip={t({
                  id: "bond.you_will_get.tooltip",
                  message:
                    "Amount of bonded KLIMA you will get, at the provided input quantity",
                  comment: "Long sentence",
                })}
                unit="KLIMA"
                value={
                  !props.isConnected
                    ? 0
                    : trimWithPlaceholder(
                        isLoading ? NaN : bondState?.bondQuote,
                        Number(bondState?.bondQuote) < 1 ? 5 : 2
                      )
                }
                warning={false}
              />
              <DataRow
                singleton={singleton}
                label={t({
                  id: "bond.maximum",
                  message: "Maximum",
                })}
                tooltip={t({
                  id: "bond.maximum.tooltip",
                  message: "Maximum amount of KLIMA you can acquire by bonding",
                  comment: "Long sentence",
                })}
                warning={
                  !!bondState?.bondQuote &&
                  !!bondState?.maxBondPrice &&
                  Number(bondState?.bondQuote) > Number(bondState?.maxBondPrice)
                }
                value={trimWithPlaceholder(bondState?.maxBondPrice, 2)}
                unit="KLIMA"
              />
              <DataRow
                singleton={singleton}
                label={t({
                  id: "bond.debt_ratio",
                  message: "Dept ratio",
                })}
                tooltip={t({
                  id: "bond.debt_ratio.tooltip",
                  message:
                    "Protocol's current ratio of supply to outstanding bonds",
                  comment: "Long sentence",
                })}
                warning={false}
                value={trimWithPlaceholder(Number(bondState?.debtRatio), 2)}
                unit="%"
              />
              <DataRow
                singleton={singleton}
                label={t({
                  id: "bond.vesting_term_end",
                  message: "Vesting term end",
                })}
                tooltip={t({
                  id: "bond.vesting_term_end.tooltip",
                  message:
                    "If you bond now, your vesting term ends at this date. Klima is slowly unlocked for redemption over the duration of this term.",
                  comment: "Long sentence",
                })}
                warning={false}
                value={vestingPeriod() ?? ""}
                unit=""
              />
            </ul>
          )}
          {view === "redeem" && (
            <ul className={styles.dataContainer}>
              {sourceSingleton}
              <li className={styles.dataContainer_row}>
                <div className={styles.dataContainer_label}>
                  <Trans id="bond.unredeemed">Unredeemed</Trans>
                  <TextInfoTooltip
                    singleton={singleton}
                    content={t({
                      id: "bond.unredeemed.tooltip",
                      message:
                        "Remaining unredeemed value (vested and un-vested)",
                      comment: "Long sentence",
                    })}
                  >
                    <div tabIndex={0} className={styles.infoIconWrapper}>
                      <InfoOutlined />
                    </div>
                  </TextInfoTooltip>
                </div>
                <div className={styles.dataContainer_value}>
                  <WithPlaceholder
                    condition={!props.isConnected}
                    placeholder="NOT CONNECTED"
                  >
                    <span>
                      {trimWithPlaceholder(bondState?.interestDue, 4)}
                    </span>{" "}
                    KLIMA
                  </WithPlaceholder>
                </div>
              </li>
              <li className={styles.dataContainer_row}>
                <div className={styles.dataContainer_label}>
                  <Trans id="bond.redeemable">Redeemable</Trans>
                  <TextInfoTooltip
                    singleton={singleton}
                    content={t({
                      id: "bond.redeemable.tooltip",
                      message:
                        "Amount of KLIMA that has already vested and can be redeemed",
                      comment: "Long sentence",
                    })}
                  >
                    <div tabIndex={0} className={styles.infoIconWrapper}>
                      <InfoOutlined />
                    </div>
                  </TextInfoTooltip>
                </div>
                <div className={styles.dataContainer_value}>
                  <WithPlaceholder
                    condition={!props.isConnected}
                    placeholder="NOT CONNECTED"
                  >
                    <span>
                      {trimWithPlaceholder(
                        bondState?.pendingPayout,
                        Number(bondState?.pendingPayout) < 1 ? 5 : 2
                      )}
                    </span>{" "}
                    KLIMA
                  </WithPlaceholder>
                </div>
              </li>
              <li className={styles.dataContainer_row}>
                <div className={styles.dataContainer_label}>
                  <Trans id="bond.date_of_full_vesting">
                    Date of full vesting
                  </Trans>
                  <TextInfoTooltip
                    singleton={singleton}
                    content={t({
                      id: "bond.date_of_full_vesting.tooltip",
                      message:
                        "Date when the entire bond value can be redeemed",
                    })}
                  >
                    <div tabIndex={0} className={styles.infoIconWrapper}>
                      <InfoOutlined />
                    </div>
                  </TextInfoTooltip>
                </div>
                <div className={styles.dataContainer_value}>
                  <WithPlaceholder
                    condition={!props.isConnected}
                    placeholder="NOT CONNECTED"
                  >
                    <span>{vestingTime()}</span>
                  </WithPlaceholder>
                </div>
              </li>
            </ul>
          )}
          {isBondDiscountNegative && view === "bond" && (
            <Text t="caption" align="center">
              <Trans
                id="bond.this_bond_price_is_inflated"
                comment="Long sentence"
              >
                ⚠️ Warning: this bond price is inflated because the current
                discount rate is negative.
              </Trans>
            </Text>
          )}
          {isDisabled && (
            <Text t="caption" align="center">
              <Trans
                id="bond.all_demand_has_been_filled"
                comment="Long sentence"
              >
                🪧 SOLD OUT. All demand has been filled for this bond. Thank you,
                Klimates!
              </Trans>
            </Text>
          )}
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

export default Bond;

const WithPlaceholder: FC<{
  condition: boolean;
  placeholder: string;
}> = (props) => {
  if (props.condition) {
    return <>{props.placeholder}</>;
  }
  return <>{props.children}</>;
};
