import React, { useState, useEffect, FC, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import WarningOutlined from "@mui/icons-material/WarningAmberRounded";
import DownOutlined from "@mui/icons-material/KeyboardArrowDownRounded";
import UpOutlined from "@mui/icons-material/KeyboardArrowUpRounded";
import LeftOutlined from "@mui/icons-material/KeyboardArrowLeftRounded";
import { Link } from "react-router-dom";

import {
  changeApprovalTransaction,
  bondTransaction,
  redeemTransaction,
  calcBondDetails,
  calculateUserBondDetails,
  DEFAULT_QUOTE_SLP,
} from "actions/bonds";

import styles from "./index.module.css";
import t from "@klimadao/lib/theme/typography.module.css";
import { AdvancedSettings } from "./AdvancedSettings";
import { useBond } from "../ChooseBond";
import { Bond as BondType } from "@klimadao/lib/constants";
import { Spinner } from "@klimadao/lib/components";
import {
  useDebounce,
  trimWithPlaceholder,
  secondsUntilBlock,
  prettifySeconds,
  concatAddress,
  safeSub,
  safeAdd,
} from "@klimadao/lib/utils";
import { providers } from "ethers";
import { selectAppState, selectBondAllowance } from "state/selectors";
import { RootState, useAppDispatch } from "state";
import { setBondAllowance } from "state/user";
import { redeemBond, setBond } from "state/bonds";

export function prettyVestingPeriod(
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
  const [status, setStatus] = useState(""); // "userConfirmation", "networkConfirmation", "done", "userRejected, "error"

  const dispatch = useAppDispatch();
  const [slippage, setSlippage] = useState(2);
  const [recipientAddress, setRecipientAddress] = useState(props.address);

  const [view, setView] = useState("bond");
  const [quantity, setQuantity] = useState("");
  const debouncedQuantity = useDebounce(quantity, 500);

  const { currentBlock } = useSelector(selectAppState);
  const bondState = useSelector((state: RootState) => state.bonds[props.bond]);
  const allowance = useSelector(selectBondAllowance);

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
    return prettifySeconds(seconds, "day");
  };

  const vestingTime = () => {
    if (!currentBlock || !bondState?.bondMaturationBlock) return;
    return prettyVestingPeriod(currentBlock, bondState.bondMaturationBlock);
  };

  const getBondMax = () => {
    if (!bondState?.bondQuote || !bondState?.maxBondPrice) return;
    const quotedQuantity = quantity || DEFAULT_QUOTE_SLP;
    const price = Number(quotedQuantity) / Number(bondState.bondQuote);
    const maxPayable = Number(bondState.maxBondPrice) * price;
    return Number(bondState?.balance) < Number(maxPayable)
      ? bondState?.balance
      : maxPayable.toString();
  };

  const setMax = () => {
    setStatus("");
    if (view === "bond") {
      const bondMax = getBondMax();
      setQuantity(bondMax ?? "0");
    } else {
      setQuantity(bondState?.pendingPayout ?? "0");
    }
  };

  const balanceUnits = () => {
    if (props.bond === "bct") return "BCT";
    return "SLP";
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
      setStatus("");
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
      setQuantity("");
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
      return { children: "Not Connected", onClick: undefined, disabled: true };
    } else if (isLoading) {
      return {
        children: "Loading",
        onClick: undefined,
        disabled: true,
      };
    } else if (
      status === "userConfirmation" ||
      status === "networkConfirmation"
    ) {
      return { children: "Confirming", onClick: undefined, disabled: true };
    } else if (!hasAllowance()) {
      return { children: "Approve", onClick: handleAllowance };
    } else if (view === "bond") {
      const bondMax = getBondMax();
      return {
        children: "Bond",
        onClick: handleBond,
        disabled: !value || !bondMax || Number(value) > Number(bondMax),
      };
    } else if (view === "redeem") {
      return {
        children: "Redeem",
        onClick: handleRedeem,
        disabled: !Number(bondState?.pendingPayout),
      };
    } else {
      return { children: "ERROR", onClick: undefined, disabled: true };
    }
  };

  const getStatusMessage = () => {
    if (status === "userConfirmation") {
      return "Please click 'confirm' in your wallet to continue.";
    } else if (status === "networkConfirmation") {
      return "Transaction initiated. Waiting for network confirmation.";
    } else if (status === "error") {
      return "❌ Error: something went wrong...";
    } else if (status === "done") {
      return "✔️ Success!";
    } else if (status === "userRejected") {
      return "✖️ You chose to reject the transaction.";
    }
    return null;
  };

  const isBondDiscountNegative =
    bondState?.bondDiscount && bondState?.bondDiscount < 0;

  return (
    <div className={styles.stakeCard}>
      <div className={styles.bondHeader}>
        <Link
          to="/bonds"
          className={classNames(t.button, styles.bondHeader_backButton)}
        >
          <LeftOutlined />
          BACK
        </Link>
        <h3 className={t.h5}>Bond {bondInfo.name}</h3>
        <p className={t.caption}>{bondInfo.description}</p>
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
            Bond
          </button>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setView("redeem");
            }}
            data-active={view === "redeem"}
          >
            Redeem
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
            step={view === "bond" && balanceUnits() !== "BCT" ? "0.0001" : "1"}
            disabled={view === "redeem"}
          />
          <button
            className={styles.stakeInput_button}
            type="button"
            onClick={setMax}
            disabled={view === "redeem"}
          >
            Max
          </button>
        </div>
        <button
          className={classNames(t.button, styles.showAdvancedButton)}
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
        <div className={styles.dataContainer}>
          {props.address && (
            <p className={styles.dataContainer_address}>
              {concatAddress(props.address)}
            </p>
          )}
          <div className="stake-price-data-row">
            <p className="price-label">Balance</p>
            <p className="price-data">
              <WithPlaceholder
                condition={!props.isConnected}
                placeholder="NOT CONNECTED"
              >
                <span
                  data-warning={Number(quantity) > Number(bondState?.balance)}
                >
                  {trimWithPlaceholder(
                    bondState?.balance,
                    Number(bondState?.balance) < 1 ? 5 : 2
                  )}
                </span>{" "}
                {balanceUnits()}
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Bond Price</p>
            <p className="price-data">
              <span>{trimWithPlaceholder(bondState?.bondPrice, 2)}</span> BCT
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Market Price</p>
            <p className="price-data">
              <span>{trimWithPlaceholder(bondState?.marketPrice, 2)}</span> BCT
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">You Will Get</p>
            <p className="price-data">
              <span>
                {trimWithPlaceholder(
                  isLoading ? NaN : bondState?.bondQuote,
                  Number(bondState?.bondQuote) < 1 ? 5 : 2
                )}
              </span>{" "}
              KLIMA
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">Max You Can Buy</p>
            <p className="price-data">
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
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">Debt Ratio</p>
            <p className="price-data">
              <span>
                {trimWithPlaceholder(
                  Number(bondState?.debtRatio) / 10000000,
                  2
                )}
              </span>
              %
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">Vesting Term</p>
            <p className="price-data">
              <span>{vestingPeriod()}</span>
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">ROI (bond discount)</p>
            <p className="price-data">
              <span data-warning={isBondDiscountNegative}>
                {trimWithPlaceholder(bondState?.bondDiscount, 2)}
              </span>
              %
            </p>
          </div>
        </div>
      )}

      {view === "redeem" && (
        <div className={styles.dataContainer}>
          <div className="stake-price-data-row">
            <p className="price-label">Pending</p>
            <p id="bond-market-price-id" className="price-data">
              <WithPlaceholder
                condition={!props.isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{trimWithPlaceholder(bondState?.interestDue, 4)}</span>{" "}
                KLIMA
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Redeemable</p>
            <p id="bond-market-price-id" className="price-data">
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
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Time until fully vested</p>
            <p id="bond-market-price-id" className="price-data">
              <WithPlaceholder
                condition={!props.isConnected}
                placeholder="NOT CONNECTED"
              >
                <span>{vestingTime()}</span>
              </WithPlaceholder>
            </p>
          </div>
        </div>
      )}

      {view === "bond" &&
        recipientAddress &&
        recipientAddress !== props.address && (
          <p className={classNames(t.body2, styles.recipientNote)}>
            <WarningOutlined style={{ color: "yellow" }} /> External recipient:{" "}
            {concatAddress(recipientAddress)}
          </p>
        )}

      {isBondDiscountNegative && view === "bond" && (
        <p className={t.body2} style={{ textAlign: "center" }}>
          ⚠️ Warning: this bond price is inflated because the current discount
          rate is negative.
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
      {getStatusMessage() && (
        <p className={styles.statusMessage}>{getStatusMessage()}</p>
      )}
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
