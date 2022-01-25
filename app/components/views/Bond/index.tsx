import React, { useState, useEffect, FC, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import WarningOutlined from "@mui/icons-material/WarningAmberRounded";
import DownOutlined from "@mui/icons-material/KeyboardArrowDownRounded";
import UpOutlined from "@mui/icons-material/KeyboardArrowUpRounded";
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

import typography from "@klimadao/lib/theme/typography";
import { Trans, defineMessage } from "@lingui/macro";
import { i18n } from "@lingui/core";
import { prettifySeconds } from "lib/i18n";

import { AdvancedSettings } from "./AdvancedSettings";
import { useBond } from "../ChooseBond";
import { Bond as BondType } from "@klimadao/lib/constants";
import {
  Spinner,
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

import styles from "./index.module.css";

export function prettyVestingPeriod(
  locale: string | undefined,
  currentBlock: number,
  vestingBlock: number
) {
  if (vestingBlock === 0) {
    return "";
  }

  const seconds = secondsUntilBlock(currentBlock, vestingBlock);
  if (seconds < 0) {
    return "Fully Vested";
  }
  return prettifySeconds(seconds);
}

interface Props {
  provider: providers.JsonRpcProvider;
  address?: string;
  bond: BondType;
  isConnected?: boolean;
}

export const Bond: FC<Props> = (props) => {
  const bondInfo = useBond(props.bond);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fullStatus: AppNotificationStatus | null = useSelector(
    selectNotificationStatus
  );
  const status = fullStatus && fullStatus.statusType;

  const setStatus = (statusType: TxnStatus | null, message?: string) => {
    if (!statusType) return dispatch(setAppState({ notificationStatus: null }));
    dispatch(setAppState({ notificationStatus: { statusType, message } }));
  };

  const dispatch = useAppDispatch();
  const [slippage, setSlippage] = useState(2);
  const [recipientAddress, setRecipientAddress] = useState(props.address);

  const [view, setView] = useState("bond");
  const [quantity, setQuantity] = useState("");
  const debouncedQuantity = useDebounce(quantity, 500);

  const { currentBlock, locale } = useSelector(selectAppState);
  const bondState = useSelector((state: RootState) => state.bonds[props.bond]);
  const allowance = useSelector(selectBondAllowance);

  const [sourceSingleton, singleton] = useTooltipSingleton();

  const isLoading = !allowance || quantity !== debouncedQuantity;

  const showSpinner =
    props.isConnected &&
    (status === "userConfirmation" ||
      status === "networkConfirmation" ||
      isLoading);

  const onRecipientAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setRecipientAddress(e.target.value);
  };

  const onSlippageChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setSlippage(Number(e.target.value));
  };

  const vestingPeriod = () => {
    if (!bondState || !currentBlock || !bondState.vestingTerm) return;
    const vestingBlock = currentBlock + bondState.vestingTerm;
    const seconds = secondsUntilBlock(currentBlock, vestingBlock);
    return prettifySeconds(seconds);
  };

  const vestingTime = () => {
    if (!currentBlock || !bondState?.bondMaturationBlock) return;
    return prettyVestingPeriod(
      locale,
      currentBlock,
      bondState.bondMaturationBlock
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
        setRecipientAddress(props.address);
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
        slippage,
        bond: props.bond,
        provider: props.provider,
        address: recipientAddress || props.address,
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

  const getButtonProps = () => {
    const value = Number(quantity || "0");
    if (!props.isConnected || !props.address) {
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
    } else if (!hasAllowance()) {
      return {
        children: <Trans id="button.approve">Approve</Trans>,
        onClick: handleAllowance,
      };
    } else if (view === "bond") {
      const bondMax = getBondMax();
      return {
        children: <Trans id="button.bond">Bond</Trans>,
        onClick: handleBond,
        disabled: !value || !bondMax || Number(value) > Number(bondMax),
      };
    } else if (view === "redeem") {
      return {
        children: <Trans id="button.redeem">Redeem</Trans>,
        onClick: handleRedeem,
        disabled: !Number(bondState?.pendingPayout),
      };
    } else {
      // No trans_id tag for Error in stake
      return {
        children: <Trans id="button.error">Error</Trans>,
        onClick: undefined,
        disabled: true,
      };
    }
  };

  const isBondDiscountNegative =
    bondState?.bondDiscount && bondState?.bondDiscount < 0;

  defineMessage({
    id: "bond.balance.tooltip",
    message: "Balance available for bonding",
  });
  defineMessage({
    id: "bond.bond_price.tooltip",
    message:
      "Discounted price. Total amount to bond 1 full KLIMA (fractional bonds are also allowed)",
  });
  defineMessage({
    id: "bond.market_price.tooltip",
    message: "Current trading price of KLIMA, without bond discount",
  });
  defineMessage({
    id: "bond.roi.tooltip",
    message:
      "Return on investment, expressed as a percentage discount on the market value of KLIMA",
  });
  defineMessage({
    id: "bond.you_will_get.tooltip",
    message:
      "Amount of bonded KLIMA you will get, at the provided input quantity",
  });
  defineMessage({
    id: "bond.maximum.tooltip",
    message: "Maximum amount of KLIMA you can acquire by bonding",
  });
  defineMessage({
    id: "bond.debt_ratio.tooltip",
    message: "Protocol's current ratio of supply to outstanding bonds",
  });
  defineMessage({
    id: "bond.pending.tooltip",
    message: "Remaining unredeemed value (vested and un-vested)",
  });
  defineMessage({
    id: "bond.redeemable.tooltip",
    message: "Amount of KLIMA that has already vested and can be redeemed",
  });
  defineMessage({
    id: "bond.date_of_full_vesting.tooltip",
    message: "Date when the entire bond value can be redeemed",
  });

  return (
    <div className={styles.stakeCard}>
      <div className={styles.bondHeader}>
        <Link
          to="/bonds"
          className={classNames(
            typography.button,
            styles.bondHeader_backButton
          )}
        >
          <LeftOutlined />
          <Trans id="nav.back">BACK</Trans>
        </Link>
        <h3 className={typography.h5}>
          <Trans id="bond.caption">Bond {bondInfo.name}</Trans>
        </h3>
        <p className={typography.caption}>{bondInfo.description}</p>
      </div>
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
            <Trans id="button.bond">Bond</Trans>
          </button>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setView("redeem");
            }}
            data-active={view === "redeem"}
          >
            <Trans id="button.redeem">Redeem</Trans>
          </button>
        </div>
        <div className={styles.stakeInput}>
          <input
            className={styles.stakeInput_input}
            value={
              view === "bond" ? quantity || "" : bondState?.pendingPayout || ""
            }
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            placeholder={`Amount to ${
              { bond: "bond", redeem: "redeem" }[view]
            }`}
            min="0"
            step={
              view === "bond" && bondInfo.balanceUnit === "SLP" ? "0.0001" : "1"
            }
            disabled={view === "redeem"}
          />
          <button
            className={styles.stakeInput_button}
            type="button"
            onClick={setMax}
            disabled={view === "redeem"}
          >
            <Trans id="button.max">Max</Trans>
          </button>
        </div>
        <button
          className={classNames(typography.button, styles.showAdvancedButton)}
          type="button"
          onClick={() => setShowAdvanced((s) => !s)}
        >
          {showAdvanced ? <UpOutlined /> : <DownOutlined />}
          {showAdvanced ? "HIDE ADVANCED" : "SHOW ADVANCED"}
        </button>
        {showAdvanced && (
          <AdvancedSettings
            slippage={slippage}
            recipientAddress={recipientAddress}
            onRecipientAddressChange={onRecipientAddressChange}
            onSlippageChange={onSlippageChange}
          />
        )}
      </div>

      {view === "bond" && (
        <ul className={styles.dataContainer}>
          {props.address && (
            <p className={styles.dataContainer_address}>
              {concatAddress(props.address)}
            </p>
          )}
          {sourceSingleton}
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              <Trans id="bond.balance">Balance</Trans>
              <TextInfoTooltip
                content={i18n._("bond.balance.tooltip")}
                singleton={singleton}
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
                <span
                  data-warning={Number(quantity) > Number(bondState?.balance)}
                >
                  {trimWithPlaceholder(
                    bondState?.balance,
                    Number(bondState?.balance) < 1 ? 18 : 2
                  )}
                </span>{" "}
                {bondInfo.balanceUnit}
              </WithPlaceholder>
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              <Trans id="bond.bond_price">Bond price</Trans>
              <TextInfoTooltip
                content={i18n._("bond.bond_price.tooltip")}
                singleton={singleton}
              >
                <div tabIndex={0} className={styles.infoIconWrapper}>
                  <InfoOutlined />
                </div>
              </TextInfoTooltip>
            </div>
            <div className={styles.dataContainer_value}>
              <span>{trimWithPlaceholder(bondState?.bondPrice, 2)}</span>{" "}
              {bondInfo.priceUnit}
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              <Trans id="bond.market_price">Market Price</Trans>
              <TextInfoTooltip
                content={i18n._("bond.market_price.tooltip")}
                singleton={singleton}
              >
                <div tabIndex={0} className={styles.infoIconWrapper}>
                  <InfoOutlined />
                </div>
              </TextInfoTooltip>
            </div>
            <div className={styles.dataContainer_value}>
              <span>{trimWithPlaceholder(bondState?.marketPrice, 2)}</span>{" "}
              {bondInfo.priceUnit}
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              <Trans id="bond.roi">ROI (bond discount)</Trans>
              <TextInfoTooltip
                content={i18n._("bond.roi.tooltip")}
                singleton={singleton}
              >
                <div tabIndex={0} className={styles.infoIconWrapper}>
                  <InfoOutlined />
                </div>
              </TextInfoTooltip>
            </div>
            <div className={styles.dataContainer_value}>
              <span data-warning={isBondDiscountNegative}>
                {trimWithPlaceholder(bondState?.bondDiscount, 2)}
              </span>
              %
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              <Trans id="bond.you_will_get">You will get</Trans>
              <TextInfoTooltip
                singleton={singleton}
                content={i18n._("bond.you_will_get.tooltip")}
              >
                <div tabIndex={0} className={styles.infoIconWrapper}>
                  <InfoOutlined />
                </div>
              </TextInfoTooltip>
            </div>
            <div className={styles.dataContainer_value}>
              <span>
                {trimWithPlaceholder(
                  isLoading ? NaN : bondState?.bondQuote,
                  Number(bondState?.bondQuote) < 1 ? 5 : 2
                )}
              </span>{" "}
              KLIMA
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              <Trans id="bond.maximum">Maximum</Trans>
              <TextInfoTooltip
                singleton={singleton}
                content={i18n._("bond.maximum.tooltip")}
              >
                <div tabIndex={0} className={styles.infoIconWrapper}>
                  <InfoOutlined />
                </div>
              </TextInfoTooltip>
            </div>
            <div className={styles.dataContainer_value}>
              <span
                data-warning={
                  bondState?.bondQuote &&
                  bondState?.maxBondPrice &&
                  Number(bondState?.bondQuote) > Number(bondState?.maxBondPrice)
                }
              >
                {trimWithPlaceholder(bondState?.maxBondPrice, 2)}
              </span>{" "}
              KLIMA
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              <Trans id="bond.debt_ratio">Debt ratio</Trans>
              <TextInfoTooltip
                singleton={singleton}
                content={i18n._("bond.debt_ratio.tooltip")}
              >
                <div tabIndex={0} className={styles.infoIconWrapper}>
                  <InfoOutlined />
                </div>
              </TextInfoTooltip>
            </div>
            <div className={styles.dataContainer_value}>
              <span>
                {trimWithPlaceholder(Number(bondState?.debtRatio), 2)}
              </span>
              %
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              <Trans>Vesting term end</Trans>
              <TextInfoTooltip
                singleton={singleton}
                content={
                  "If you bond now, your vesting term ends at this date. Klima is slowly unlocked for redemption over the duration of this term."
                }
              >
                <div tabIndex={0} className={styles.infoIconWrapper}>
                  <InfoOutlined />
                </div>
              </TextInfoTooltip>
            </div>
            <div className={styles.dataContainer_value}>
              <span>{vestingPeriod()}</span>
            </div>
          </li>
        </ul>
      )}

      {view === "redeem" && (
        <ul className={styles.dataContainer}>
          {props.address && (
            <p className={styles.dataContainer_address}>
              {concatAddress(props.address)}
            </p>
          )}
          {sourceSingleton}
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              <Trans id="bond.pending">Pending</Trans>
              <TextInfoTooltip
                singleton={singleton}
                content={i18n._("bond.pending.tooltip")}
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
                <span>{trimWithPlaceholder(bondState?.interestDue, 4)}</span>{" "}
                KLIMA
              </WithPlaceholder>
            </div>
          </li>
          <li className={styles.dataContainer_row}>
            <div className={styles.dataContainer_label}>
              <Trans id="bond.redeemable">Redeemable</Trans>
              <TextInfoTooltip
                singleton={singleton}
                content={i18n._("bond.redeemable.tooltip")}
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
              <Trans id="bond.date_of_full_vesting">Date of full vesting</Trans>
              <TextInfoTooltip
                singleton={singleton}
                content={i18n._("bond.date_of_full_vesting.tooltip")}
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

      {view === "bond" &&
        recipientAddress &&
        recipientAddress !== props.address && (
          <p className={classNames(typography.body2, styles.recipientNote)}>
            <WarningOutlined style={{ color: "yellow" }} /> External recipient:{" "}
            {concatAddress(recipientAddress)}
          </p>
        )}

      {isBondDiscountNegative && view === "bond" && (
        <p className={typography.body2} style={{ textAlign: "center" }}>
          <Trans id="status.bond_negative">
            ⚠️ Warning: this bond price is inflated because the current discount
            rate is negative.
          </Trans>
        </p>
      )}
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
