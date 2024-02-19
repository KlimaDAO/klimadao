import LeftOutlined from "@mui/icons-material/KeyboardArrowLeftRounded";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import { TippyProps } from "@tippyjs/react";
import {
  bondMapToBondName,
  bondMapToTokenName,
  bondTransaction,
  calcBondDetails,
  calculateUserBondDetails,
  getIsInverse,
  redeemTransaction,
} from "actions/bonds";
import { FC, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppNotificationStatus, setAppState, TxnStatus } from "state/app";
import { selectLocale, selectNotificationStatus } from "state/selectors";

import { changeApprovalTransaction } from "actions/utils";

import { prettifySeconds } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";

import {
  ButtonBaseProps,
  ButtonPrimary,
  Spinner,
  Text,
  TextInfoTooltip,
  useTooltipSingleton,
} from "@klimadao/lib/components";
import { addresses, Bond as BondType } from "@klimadao/lib/constants";
import {
  concatAddress,
  safeAdd,
  safeSub,
  secondsUntilBlock,
  trimWithPlaceholder,
  useDebounce,
} from "@klimadao/lib/utils";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { BondBalancesCard } from "components/BondBalancesCard";
import { Image } from "components/Image";
import { ImageCard } from "components/ImageCard";
import { TransactionModal } from "components/TransactionModal";
import { providers } from "ethers";
import { tokenInfo } from "lib/getTokenInfo";
import { RootState, useAppDispatch } from "state";
import { redeemBond, setBond } from "state/bonds";
import { selectAppState, selectBondAllowance } from "state/selectors";
import { setBondAllowance } from "state/user";
import { useBond } from "../ChooseBond";
import * as styles from "./styles";

export function prettyVestingPeriod(
  locale = "en",
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
  return prettifySeconds(seconds, locale);
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

interface Props {
  provider?: providers.JsonRpcProvider;
  address?: string;
  bond: BondType;
  isConnected?: boolean;
  toggleModal: () => void;
}

export const Bond: FC<Props> = (props) => {
  const locale = useSelector(selectLocale);
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
  const [shouldAutostake, setShouldAutostake] = useState(false);
  const debouncedQuantity = useDebounce(quantity, 500);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const { currentBlock, blockRate } = useSelector(selectAppState);
  const bondState = useSelector((state: RootState) => state.bonds[props.bond]);
  const userState = useSelector((state: RootState) => state.user);
  const allowance = useSelector(selectBondAllowance);

  const [sourceSingleton, singleton] = useTooltipSingleton();
  const isLoading = !allowance || quantity !== debouncedQuantity;

  const showSpinner =
    props.isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  const viewIsBond = view === "bond";
  const viewIsReedem = view === "redeem";

  const isDisabled = viewIsBond && bondInfo.disabled;

  const isBondDiscountNegative =
    !!bondState?.bondDiscount && bondState?.bondDiscount < 0;

  const closeModal = () => {
    setStatus(null);
    setShowTransactionModal(false);
  };

  const vestingPeriod = () => {
    if (!bondState || !currentBlock || !bondState.vestingTerm) return;
    const vestingBlock = currentBlock + bondState.vestingTerm;
    const seconds = secondsUntilBlock(currentBlock, vestingBlock, blockRate);
    return prettifySeconds(seconds, locale);
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

  const getBondV1Max = (): string => {
    if (
      !bondState?.maxBondPrice ||
      !bondState?.bondPrice ||
      !bondState?.balance
    ) {
      return "0";
    }
    // max you can input = the max amount you can get out (klima) * price
    const maxPayable =
      Number(bondState.maxBondPrice) * Number(bondState.bondPrice);
    const bondMax =
      Number(bondState?.balance) < Number(maxPayable)
        ? bondState?.balance
        : maxPayable.toString();
    return bondMax;
  };

  const getInverseBondMax = (): string => {
    if (
      !bondState?.maxBondPrice ||
      !bondState?.bondPrice ||
      !userState?.balance?.klima
    ) {
      return "0";
    }
    const maxPayable = Number(bondState.maxBondPrice);
    const bondMax =
      Number(userState.balance.klima) * Number(bondState.bondPrice) <
      Number(maxPayable)
        ? userState.balance.klima
        : (maxPayable / Number(bondState.bondPrice)).toString();
    return bondMax;
  };

  const getBondMax = (): string => {
    if (!!bondState && getIsInverse(bondState.bond)) {
      return getInverseBondMax();
    }
    return getBondV1Max();
  };

  const setMax = () => {
    setStatus(null);
    if (viewIsBond) {
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
          })
        );
      }
      // only when the user is connected
      if (props.provider && props.address) {
        dispatch(
          calculateUserBondDetails({
            address: props.address,
            bond: props.bond,
          })
        );
      }
    }
    loadBondDetails();
  }, [debouncedQuantity, props.address]);

  const handleAllowance = async () => {
    try {
      if (!props.provider) return;

      const token = bondMapToTokenName[props.bond];
      const spender = bondMapToBondName[props.bond];

      setStatus(null);

      const approvedValue = await changeApprovalTransaction({
        value: quantity.toString(),
        provider: props.provider,
        token,
        spender,
        onStatus: setStatus,
      });
      dispatch(setBondAllowance({ [props.bond]: approvedValue }));
    } catch (e) {
      return;
    }
  };

  const handleAutostakeCheck = (): void => setShouldAutostake(!shouldAutostake);

  const handleV1Bond = async () => {
    if (!props.provider) return;
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

  const handleInverseBond = async () => {
    try {
      if (
        !props.address ||
        !bondState?.bondQuote ||
        !bondState?.maxBondPrice ||
        !props.provider
      ) {
        return;
      }
      await bondTransaction({
        value: quantity,
        // idk about the slippage
        slippage: 2,
        bond: props.bond,
        provider: props.provider,
        onStatus: setStatus,
      });
      setQuantity("");
      dispatch(
        setBond({
          bond: props.bond,
          maxBondPrice: safeSub(bondState.maxBondPrice, bondState.bondQuote),
        })
      );
    } catch (error: any) {
      console.error(error);
      return;
    }
  };

  const handleBond = () => {
    if (getIsInverse(props.bond)) {
      return handleInverseBond();
    }
    return handleV1Bond();
  };

  const handleRedeem = async () => {
    try {
      if (!bondState?.pendingPayout || !props.address || !props.provider)
        return;
      setQuantity("");
      await redeemTransaction({
        address: props.address,
        bond: props.bond,
        provider: props.provider,
        onStatus: setStatus,
        shouldAutostake,
      });
      dispatch(
        redeemBond({
          bond: props.bond,
          value: bondState.pendingPayout,
          autostake: shouldAutostake,
        })
      );
    } catch (e) {
      return;
    }
  };

  const hasApproval = () => {
    return (
      !!allowance &&
      !!Number(allowance[props.bond]) &&
      Number(quantity) <= Number(allowance[props.bond]) // Caution: Number trims values down to 17 decimal places of precision
    );
  };

  const getButtonProps = (): ButtonBaseProps => {
    const value = Number(quantity || "0");
    const bondMax = Number(getBondMax());
    if (!props.isConnected || !props.address) {
      return {
        label: t({
          id: "shared.login_connect",
          message: "Login / Connect",
        }),
        onClick: props.toggleModal,
      };
    } else if (isDisabled) {
      return {
        label: <Trans id="shared.sold_out">Sold Out</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (isLoading) {
      return {
        label: <Trans>Loading</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (viewIsBond && !value) {
      return {
        label: <Trans>Enter Quantity</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (viewIsReedem && !Number(bondState?.pendingPayout)) {
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
    } else if (bondMax && value && value > bondMax) {
      return {
        label: <Trans id="bond.max_exceeded">MAX EXCEEDED</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (
      bondState?.capacity &&
      bondState.bondQuote &&
      bondState?.capacity < Number(bondState.bondQuote)
    ) {
      return {
        label: <Trans id="bond.capacity_exceeded">CAPACITY EXCEEDED</Trans>,
        onClick: undefined,
        disabled: true,
      };
    } else if (!hasApproval()) {
      return {
        label: <Trans>Approve</Trans>,
        disabled: false,
        onClick: () => setShowTransactionModal(true),
        variant: "blue",
        shape: "rounded",
      };
    } else if (viewIsBond) {
      return {
        label: <Trans id="bond.bond">Bond</Trans>,
        onClick: () => setShowTransactionModal(true),
        disabled: !value || !bondMax,
      };
    } else if (viewIsReedem) {
      return {
        label: <Trans id="bond.redeem">Redeem</Trans>,
        onClick: () => setShowTransactionModal(true),
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
    if (viewIsBond) {
      return t({
        id: "bond.inputplaceholder.amount_to_bond",
        message: "Amount to bond",
      });
    } else if (viewIsReedem) {
      return t({
        id: "bond.inputplaceholder.amount_to_redeem",
        message: "Amount to redeem",
      });
    } else {
      return t({ id: "shared.error", message: "ERROR" });
    }
  };

  const getBalance = () => {
    if (!props.isConnected) {
      return 0;
    }
    if (getIsInverse(props.bond)) {
      return trimWithPlaceholder(
        userState?.balance?.klima,
        Number(userState?.balance?.klima) < 1 ? 18 : 2,
        locale
      );
    }
    return trimWithPlaceholder(
      bondState?.balance,
      Number(bondState?.balance) < 1 ? 18 : 2,
      locale
    );
  };

  const getBalanceExceeded = () => {
    if (!props.isConnected) {
      return false;
    }
    if (getIsInverse(props.bond)) {
      return Number(quantity) > Number(userState?.balance?.klima);
    }
    return Number(quantity) > Number(bondState?.balance);
  };

  return (
    <>
      {getIsInverse(props.bond) && <BondBalancesCard bond={props.bond} />}
      <div className={styles.bondCard}>
        <div className={styles.bondCard_header}>
          <Link to="/bonds" className={styles.backButton}>
            <LeftOutlined />
            <Text t="button" color="lighter">
              <Trans id="nav.back">BACK</Trans>
            </Text>
          </Link>
          <div className="icon_container">
            <Image
              className="icon"
              src={bondInfo.icon}
              alt=""
              width={48}
              height={48}
            />
          </div>

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
            {!getIsInverse(props.bond) && (
              <div className={styles.stakeSwitch}>
                <button
                  className={styles.switchButton}
                  type="button"
                  onClick={() => {
                    setView("bond");
                  }}
                  data-active={viewIsBond}
                >
                  <Trans id="bond.bond">Bond</Trans>
                </button>
                <button
                  className={styles.switchButton}
                  type="button"
                  onClick={() => {
                    setView("redeem");
                  }}
                  data-active={viewIsReedem}
                >
                  <Trans id="bond.redeem">Redeem</Trans>
                </button>
              </div>
            )}
            <div className={styles.stakeInput}>
              <input
                className={styles.stakeInput_input}
                value={
                  viewIsBond ? quantity || "" : bondState?.pendingPayout || ""
                }
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder={getInputPlaceholder()}
                min="0"
                step={
                  viewIsBond && bondInfo.balanceUnit === "SLP" ? "0.0001" : "1"
                }
                disabled={viewIsReedem}
              />
              <button
                className={styles.stakeInput_max}
                type="button"
                onClick={setMax}
                disabled={viewIsReedem}
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
          {viewIsBond && (
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
                value={getBalance()}
                warning={getBalanceExceeded()}
              />
              {getIsInverse(props.bond) ? (
                /**
                 *
                 * INVERSE BONDS
                 *
                 */
                <>
                  <DataRow
                    singleton={singleton}
                    label={t({
                      id: "bond.market_price",
                      message: "Market price",
                    })}
                    tooltip={t({
                      id: "bond.bond_price.tooltip.inverse",
                      message: "Current trading price of KLIMA on the market",
                    })}
                    unit="USDC.e"
                    value={trimWithPlaceholder(
                      1 / Number(bondState?.marketPrice),
                      2,
                      locale
                    )}
                    warning={false}
                  />
                  <DataRow
                    singleton={singleton}
                    label={t({
                      id: "bond.payout_per_klima",
                      message: "Payout per KLIMA",
                    })}
                    tooltip={t({
                      id: "bond.payout_per_klima.description_inverse",
                      message:
                        "If you bond 1 KLIMA, you will receive this amount in USDC.",
                    })}
                    unit={"USDC.e"}
                    value={trimWithPlaceholder(
                      1 / Number(bondState?.bondPrice),
                      3,
                      locale
                    )}
                    warning={false}
                  />
                  <DataRow
                    singleton={singleton}
                    label={t({
                      id: "bond.inverse.premium",
                      message: "Premium",
                    })}
                    tooltip={t({
                      id: "bond.inverse.premium.description",
                      message: "Premium relative to the market value of KLIMA.",
                    })}
                    unit={"%"}
                    value={trimWithPlaceholder(
                      bondState?.bondDiscount,
                      2,
                      locale
                    )}
                    warning={isBondDiscountNegative}
                  />
                  <DataRow
                    singleton={singleton}
                    label={t({
                      message: "Capacity",
                    })}
                    tooltip={t({
                      id: "capacity.description_inverse",
                      message:
                        "This is the amount of USDC in the contract available for bonds.",
                    })}
                    unit={"USDC.e"}
                    value={trimWithPlaceholder(
                      Number(bondState?.capacity),
                      3,
                      locale
                    )}
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
                      message: "Maximum amount you can acquire by bonding",
                    })}
                    warning={
                      !!bondState?.bondQuote &&
                      !!bondState?.maxBondPrice &&
                      Number(bondState?.bondQuote) >
                        Number(bondState?.maxBondPrice)
                    }
                    value={
                      Number(bondState?.capacity) < Number(getBondMax())
                        ? trimWithPlaceholder(
                            Number(bondState?.capacity),
                            3,
                            locale
                          )
                        : trimWithPlaceholder(
                            bondState?.maxBondPrice,
                            2,
                            locale
                          )
                    }
                    unit="USDC.e"
                  />
                  <DataRow
                    singleton={singleton}
                    label={t({
                      id: "bond.you_will_get",
                      message: "You will get",
                    })}
                    tooltip={t({
                      id: "bond.you_will_get.description_inverse",
                      message:
                        "Amount you will get, at the provided input quantity",
                    })}
                    unit="USDC.e"
                    value={
                      !props.isConnected
                        ? 0
                        : trimWithPlaceholder(
                            isLoading ? NaN : bondState?.bondQuote,
                            Number(bondState?.bondQuote) < 1 ? 5 : 2,
                            locale
                          )
                    }
                    warning={false}
                  />
                </>
              ) : (
                /**
                 *
                 * NON-INVERSE BONDS
                 *
                 * */
                <>
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
                    value={trimWithPlaceholder(bondState?.bondPrice, 2, locale)}
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
                    value={trimWithPlaceholder(
                      bondState?.marketPrice,
                      2,
                      locale
                    )}
                    warning={false}
                  />
                  <DataRow
                    singleton={singleton}
                    label={t({
                      id: "bond.debt_ratio",
                      message: "Debt ratio",
                    })}
                    tooltip={t({
                      id: "bond.debt_ratio.tooltip",
                      message:
                        "Protocol's current ratio of supply to outstanding bonds",
                      comment: "Long sentence",
                    })}
                    warning={false}
                    value={trimWithPlaceholder(
                      Number(bondState?.debtRatio),
                      2,
                      locale
                    )}
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
                    })}
                    warning={false}
                    value={vestingPeriod() ?? ""}
                    unit=""
                  />
                  <DataRow
                    singleton={singleton}
                    label={t({
                      id: "bond.discount",
                      message: "Bond discount",
                    })}
                    tooltip={t({
                      id: "bond.discount.description_tooltip",
                      message:
                        "Percentage discount (or premium if negative) relative to the market value of KLIMA.",
                    })}
                    unit={"%"}
                    value={trimWithPlaceholder(
                      bondState?.bondDiscount,
                      2,
                      locale
                    )}
                    warning={isBondDiscountNegative}
                  />
                  <DataRow
                    singleton={singleton}
                    label={t({
                      id: "bond.maximum",
                      message: "Maximum",
                    })}
                    tooltip={t({
                      id: "bond.maximum.tooltip",
                      message: "Maximum amount you can acquire by bonding",
                    })}
                    warning={
                      !!bondState?.bondQuote &&
                      !!bondState?.maxBondPrice &&
                      Number(bondState?.bondQuote) >
                        Number(bondState?.maxBondPrice)
                    }
                    value={trimWithPlaceholder(
                      bondState?.maxBondPrice,
                      2,
                      locale
                    )}
                    unit="KLIMA"
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
                            Number(bondState?.bondQuote) < 1 ? 5 : 2,
                            locale
                          )
                    }
                    warning={false}
                  />
                </>
              )}
            </ul>
          )}
          {viewIsReedem && (
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
                      {trimWithPlaceholder(bondState?.interestDue, 4, locale)}
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
                        Number(bondState?.pendingPayout) < 1 ? 5 : 2,
                        locale
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
          {isBondDiscountNegative && viewIsBond && (
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
                SOLD OUT. All demand has been filled for this bond. Thank you,
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
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <ButtonPrimary
                  {...getButtonProps()}
                  className={styles.submitButton}
                />
                {viewIsReedem && !showSpinner && (
                  <div className={styles.checkboxContainer}>
                    <Checkbox
                      checked={shouldAutostake}
                      onChange={handleAutostakeCheck}
                      className={styles.checkbox}
                    />{" "}
                    <Text t="caption" align="center">
                      <Trans
                        id="bond.should_autostake"
                        comment="should autostake?"
                      >
                        Automatically stake for sKLIMA
                      </Trans>
                    </Text>
                  </div>
                )}
              </Box>
            )}
          </div>
        </div>
      </div>

      {showTransactionModal && (
        <TransactionModal
          title={
            <Text t="h4" className={styles.transaction_modal_header_title}>
              <SpaOutlined />
              {viewIsBond ? (
                <Trans
                  id="bond.transaction_modal.bond.title"
                  comment="Bond {0}"
                >
                  Bond {bondInfo.name}
                </Trans>
              ) : (
                <Trans id="bond.transaction_modal.redeem.title">
                  Redeem Klima
                </Trans>
              )}
            </Text>
          }
          onCloseModal={closeModal}
          tokenName={viewIsBond ? bondMapToTokenName[props.bond] : "klima"}
          tokenIcon={
            tokenInfo[viewIsBond ? bondMapToTokenName[props.bond] : "klima"]
              .icon
          }
          spenderAddress={addresses["mainnet"][bondMapToBondName[props.bond]]}
          value={
            viewIsBond ? quantity.toString() : bondState?.pendingPayout || "0"
          }
          status={fullStatus}
          onResetStatus={() => setStatus(null)}
          onApproval={handleAllowance} // skipped if is Reedem
          hasApproval={viewIsBond ? hasApproval() : true} // Redeem needs no approval
          onSubmit={viewIsBond ? handleBond : handleRedeem}
        />
      )}

      <ImageCard />
    </>
  );
};

export default Bond;

const WithPlaceholder: FC<{
  condition: boolean;
  placeholder: string;
  children: ReactNode;
}> = (props) => {
  if (props.condition) {
    return <>{props.placeholder}</>;
  }
  return <>{props.children}</>;
};
