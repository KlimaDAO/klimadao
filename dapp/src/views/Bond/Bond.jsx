import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { WarningOutlined, DownOutlined, UpOutlined, LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { shorten, trimWithPlaceholder, secondsUntilBlock, prettifySeconds, prettyVestingPeriod } from "../../helpers";
import {
  changeApprovalTransaction,
  incrementBondApproval,
  bondTransaction,
  redeemTransaction,
  updateBond,
  decrementBondRedeem,
  calcBondDetails,
  calculateUserBondDetails,
  DEFAULT_QUOTE_SLP,
} from "../../actions/Bond.actions";
import { BONDS } from "../../constants";
import styles from "./Bond.module.css";
import t from "../../styles/typography.module.css";
import AdvancedSettings from "./AdvancedSettings";
import { useBond } from "../../hooks/useBond";
import { useDebounce } from "../../hooks/useDebounce";
import { Spinner } from "../../components/Spinner";

function Bond({ provider, address, bond, isConnected }) {
  const bondInfo = useBond(bond);
  const [showAdvanced, setShowAdvanced] = useState();
  const [status, setStatus] = useState(""); // "userConfirmation", "networkConfirmation", "done", "userRejected, "error"

  const dispatch = useDispatch();

  const NETWORK_ID = 137;

  const [slippage, setSlippage] = useState(2);
  const [recipientAddress, setRecipientAddress] = useState(address);

  const [view, setView] = useState("bond");
  const [quantity, setQuantity] = useState("");
  const debouncedQuantity = useDebounce(quantity, 500);

  const currentBlock = useSelector(state => {
    return state.app.currentBlock;
  });
  const bondMaturationBlock = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].bondMaturationBlock;
  });
  const vestingTerm = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].vestingTerm;
  });
  const marketPrice = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].marketPrice;
  });
  const bondPrice = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].bondPrice;
  });
  const bondDiscount = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].bondDiscount;
  });
  const maxKLIMA = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].maxBondPrice;
  });
  const interestDue = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].interestDue;
  });
  const pendingPayout = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].pendingPayout;
  });
  const debtRatio = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].debtRatio;
  });
  const bondQuote = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].bondQuote;
  });
  const balance = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].balance;
  });
  const allowance = useSelector(state => {
    return state.bonding[bond] && state.bonding[bond].allowance;
  });
  const isLoading = typeof allowance === "undefined" || quantity !== debouncedQuantity;
  const showSpinner = isConnected && (status === "userConfirmation" || status === "networkConfirmation" || isLoading);

  const onRecipientAddressChange = e => {
    return setRecipientAddress(e.target.value);
  };

  const onSlippageChange = e => {
    return setSlippage(e.target.value);
  };

  const vestingPeriod = () => {
    const vestingBlock = parseInt(currentBlock) + parseInt(vestingTerm);
    const seconds = secondsUntilBlock(currentBlock, vestingBlock);
    return prettifySeconds(seconds, "day");
  };

  const vestingTime = () => {
    return prettyVestingPeriod(currentBlock, bondMaturationBlock);
  };

  const getBondMax = () => {
    const quotedQuantity = quantity || DEFAULT_QUOTE_SLP;
    const price = quotedQuantity / bondQuote;
    const maxPayable = maxKLIMA * price;
    return Number(balance) < Number(maxPayable) ? balance : maxPayable;
  };

  const setMax = () => {
    setStatus("");
    if (view === "bond") {
      if (!bondQuote || !maxKLIMA || !balance) {
        return;
      }
      const bondMax = getBondMax();
      setQuantity(bondMax);
    } else {
      setQuantity(pendingPayout);
    }
  };

  const balanceUnits = () => {
    if (bond.indexOf("_lp") >= 0) return "SLP";
    if (bond === BONDS.dai) return "BCT";
  };

  useEffect(() => {
    async function loadBondDetails() {
      if (provider) dispatch(calcBondDetails({ bond, value: debouncedQuantity, provider, networkID: NETWORK_ID }));
      if (provider && address) {
        dispatch(calculateUserBondDetails({ address, bond, provider, networkID: NETWORK_ID }));
        setRecipientAddress(address);
      }
    }
    loadBondDetails();
  }, [provider, debouncedQuantity, address, bond, dispatch]);

  const handleAllowance = async () => {
    try {
      setStatus("");
      const value = await changeApprovalTransaction({
        provider,
        networkID: 137,
        bond,
        onStatus: setStatus,
      });
      dispatch(incrementBondApproval({ bond, allowance: value }));
    } catch (e) {
      return;
    }
  };

  const handleBond = async () => {
    try {
      setQuantity("");
      if (interestDue > 0 || pendingPayout > 0) {
        const didConfirm = window.confirm(
          "You have an existing bond. Bonding will reset your vesting period and forfeit rewards. We recommend claiming rewards first or using a fresh wallet. Do you still want to proceed?",
        );
        if (!didConfirm) {
          return; // early exit
        }
      }
      await bondTransaction({
        value: quantity,
        slippage,
        bond,
        networkID: NETWORK_ID,
        provider,
        address: recipientAddress || address,
        onStatus: setStatus,
      });
      const newBalance = (Number(balance) - Number(quantity)).toString();
      const newInterestDue = (Number(interestDue) + Number(bondQuote)).toString();
      console.log("calculating", maxKLIMA, bondQuote, Number(maxKLIMA) - Number(bondQuote));
      const newMaxBondPrice = Number(maxKLIMA) - Number(bondQuote);
      dispatch(
        updateBond({ bond, data: { balance: newBalance, interestDue: newInterestDue, maxBondPrice: newMaxBondPrice } }),
      );
    } catch (error) {
      return;
    }
  };

  const handleRedeem = async () => {
    try {
      setQuantity("");
      await redeemTransaction({ address, bond, networkID: NETWORK_ID, provider, onStatus: setStatus });
      dispatch(
        decrementBondRedeem({
          bond,
          value: pendingPayout,
        }),
      );
    } catch (e) {
      return;
    }
  };

  const hasAllowance = () => !!allowance && allowance > 0;

  const getButtonProps = () => {
    const value = Number(quantity || "0");
    if (!isConnected || !address) {
      return { children: "Please Connect", onClick: undefined, disabled: true };
    } else if (isLoading) {
      return {
        children: "Loading",
        onClick: undefined,
        disabled: true,
      };
    } else if (status === "userConfirmation" || status === "networkConfirmation") {
      return { children: "Confirming", onClick: undefined, disabled: true };
    } else if (!hasAllowance()) {
      return { children: "Approve", onClick: handleAllowance };
    } else if (view === "bond") {
      return { children: "Bond", onClick: handleBond, disabled: !value || value > getBondMax() };
    } else if (view === "redeem") {
      return { children: "Redeem", onClick: handleRedeem, disabled: !pendingPayout || !Number(pendingPayout) };
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

  const bondDiscountPercent = bondDiscount * 100;
  const isBondDiscountNegative = bondDiscountPercent < 0;

  return (
    <div className={styles.stakeCard}>
      <div className={styles.bondHeader}>
        <Link to="/bonds" className={classNames(t.button, styles.bondHeader_backButton)}>
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
            value={view === "bond" ? quantity || "" : pendingPayout || ""}
            onChange={e => setQuantity(e.target.value)}
            type="number"
            placeholder={`Amount to ${{ bond: "bond", redeem: "redeem" }[view]}`}
            min="0"
            step={view === "bond" && balanceUnits() !== "BCT" ? "0.0001" : "1"}
            disabled={view === "redeem"}
          />
          <button className={styles.stakeInput_button} type="button" onClick={setMax} disabled={view === "redeem"}>
            Max
          </button>
        </div>
        <button
          className={classNames(t.button, styles.showAdvancedButton)}
          type="button"
          onClick={() => setShowAdvanced(s => !s)}
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
          {address && (
            <p className={styles.dataContainer_address}>
              {address.slice(0, 5)}..{address.slice(address.length - 3)}
            </p>
          )}
          <div className="stake-price-data-row">
            <p className="price-label">Balance</p>
            <p className="price-data">
              <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
                <span data-warning={Number(quantity) > Number(balance)}>
                  {trimWithPlaceholder(balance, balance < 1 ? 5 : 2)}
                </span>{" "}
                {balanceUnits()}
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Bond Price</p>
            <p className="price-data">
              <span>{trimWithPlaceholder(bondPrice, 2)}</span> BCT
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Market Price</p>
            <p className="price-data">
              <span>{trimWithPlaceholder(marketPrice, 2)}</span> BCT
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">You Will Get</p>
            <p className="price-data">
              <span>{trimWithPlaceholder(isLoading ? NaN : bondQuote, bondQuote < 1 ? 5 : 2)}</span> KLIMA
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">Max You Can Buy</p>
            <p className="price-data">
              <span data-warning={bondQuote && maxKLIMA && Number(bondQuote) > Number(maxKLIMA)}>
                {trimWithPlaceholder(maxKLIMA, 2)}
              </span>{" "}
              KLIMA
            </p>
          </div>

          <div className="stake-price-data-row">
            <p className="price-label">Debt Ratio</p>
            <p className="price-data">
              <span>{trimWithPlaceholder(debtRatio / 10000000, 2)}</span>%
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
              <span data-warning={isBondDiscountNegative}>{trimWithPlaceholder(bondDiscount * 100, 2)}</span>%
            </p>
          </div>
        </div>
      )}

      {view === "redeem" && (
        <div className={styles.dataContainer}>
          <div className="stake-price-data-row">
            <p className="price-label">Pending</p>
            <p id="bond-market-price-id" className="price-data">
              <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
                <span>{trimWithPlaceholder(interestDue, 4)}</span> KLIMA
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Redeemable</p>
            <p id="bond-market-price-id" className="price-data">
              <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
                <span>{trimWithPlaceholder(pendingPayout, pendingPayout < 1 ? 5 : 2)}</span> KLIMA
              </WithPlaceholder>
            </p>
          </div>
          <div className="stake-price-data-row">
            <p className="price-label">Time until fully vested</p>
            <p id="bond-market-price-id" className="price-data">
              <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
                <span>{vestingTime()}</span>
              </WithPlaceholder>
            </p>
          </div>
        </div>
      )}

      {view === "bond" && recipientAddress && recipientAddress !== address && (
        <p className={classNames(t.body2, styles.recipientNote)}>
          <WarningOutlined style={{ color: "yellow" }} /> External recipient: {shorten(recipientAddress)}
        </p>
      )}

      {isBondDiscountNegative && view === "bond" && (
        <p style={{ textAlign: "center" }}>
          ⚠️ Warning: this bond price is inflated because the current discount rate is negative.
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
        <button type="button" className={styles.submitButton} {...getButtonProps()} />
      </div>
      {getStatusMessage() && <p className={styles.statusMessage}>{getStatusMessage()}</p>}
    </div>
  );
}

export default Bond;

const WithPlaceholder = props => {
  if (props.condition) {
    return <>{props.placeholder}</>;
  }
  return props.children;
};
