import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { trimWithPlaceholder } from "../../helpers";
import {
  exerciseTransaction,
  changeApprovalTransaction,
  decrementPklima,
  incrementBctApproval,
  incrementPklimaApproval,
} from "../../actions/PKlima.actions";
import styles from "../Stake/Stake.module.css";
import t from "../../styles/typography.module.css";
import { Spinner } from "../../components/Spinner";

function PKlima(props) {
  const { provider, address, isConnected } = props;
  const dispatch = useDispatch();

  const [view, setView] = useState("stake");
  const [status, setStatus] = useState(""); // "userConfirmation", "networkConfirmation", "done", "userRejected, "error"
  const [quantity, setQuantity] = useState("");

  const pKlimaBalance = useSelector(state => {
    return state.app.balances && state.app.balances.pKLIMA;
  });
  const bctBalance = useSelector(state => {
    return state.app.balances && state.app.balances.bctBalance;
  });
  const pAllowance = useSelector(state => {
    return state.app.exercise && state.app.exercise.pExercise;
  });
  const bctAllowance = useSelector(state => {
    return state.app.exercise && state.app.exercise.bctExercise;
  });
  const termsPercent = useSelector(state => {
    return state.app.exercise && state.app.exercise.terms && state.app.exercise.terms.percent;
  });
  const termsMax = useSelector(state => {
    return state.app.exercise && state.app.exercise.terms && state.app.exercise.terms.max;
  });
  const termsClaimed = useSelector(state => {
    return state.app.exercise && state.app.exercise.terms && state.app.exercise.terms.claimed;
  });

  const pKlimaVestable = useSelector(state => {
    return state.app.exercise && state.app.exercise.pklimaVestable;
  });
  const isLoading = typeof pAllowance === "undefined";
  const showSpinner = isConnected && (status === "userConfirmation" || status === "networkConfirmation" || isLoading);

  const setMax = () => {
    setStatus("");
    setQuantity(pKlimaVestable);
  };

  const handleApproval = action => async () => {
    try {
      const value = await changeApprovalTransaction({
        provider,
        networkID: 137,
        action,
        onStatus: setStatus,
      });
      dispatch(action === "pklima" ? incrementPklimaApproval(value) : incrementBctApproval(value));
    } catch (e) {
      return;
    }
  };

  const handleExercise = async () => {
    try {
      const value = quantity.toString();
      setQuantity("");
      await exerciseTransaction({
        value,
        provider,
        networkID: 137,
        onStatus: setStatus,
      });
      dispatch(decrementPklima(value));
    } catch (e) {
      return;
    }
  };

  const hasAllowance = token => {
    if (token === "pklima") return pAllowance && pAllowance.gt(0);
    if (token === "bct") return bctAllowance && bctAllowance.gt(0);
  };

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
    } else if (!hasAllowance("pklima")) {
      return { children: "1. Approve pKLIMA", onClick: handleApproval("pklima") };
    } else if (!hasAllowance("bct")) {
      return { children: "2. Approve BCT", onClick: handleApproval("bct") };
    } else {
      return { children: "EXERCISE", onClick: handleExercise, disabled: !value || value > pKlimaVestable };
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

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>Exercise pKLIMA</h2>
        <p className={t.body2}>Exercise 1 pKLIMA and 1 BCT to receive 1 KLIMA.</p>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.stakeSwitch}>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setView("stake");
            }}
            data-active={view === "stake"}
          >
            pKLIMA
          </button>
        </div>
        <div className={styles.stakeInput}>
          <input
            className={styles.stakeInput_input}
            value={quantity}
            onChange={e => {
              setQuantity(e.target.value);
              setStatus("");
            }}
            type="number"
            placeholder={`${{ stake: "PKLIMA", unstake: "ALKLIMA" }[view]} to Exercise`}
            min="0"
          />
          <button className={styles.stakeInput_button} type="button" onClick={setMax}>
            Max
          </button>
        </div>
      </div>

      <div className={styles.dataContainer}>
        {address && (
          <p className={styles.dataContainer_address}>
            {address.slice(0, 5)}..{address.slice(address.length - 3)}
          </p>
        )}
        {view === "stake" && (
          <div className="stake-price-data-row">
            <p className="price-label">pKLIMA Balance</p>
            <p className="price-data">
              <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
                <span>{trimWithPlaceholder(pKlimaBalance, 4)}</span> pKLIMA
              </WithPlaceholder>
            </p>
          </div>
        )}
        <div className="stake-price-data-row">
          <p className="price-label">BCT Balance</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(bctBalance, 4)}</span> BCT
            </WithPlaceholder>
          </p>
        </div>
        <div className="stake-price-data-row">
          <p className="price-label">Vesting Share</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(termsPercent / 10000, 2)}</span>%
            </WithPlaceholder>
          </p>
        </div>
        <div className="stake-price-data-row">
          <p className="price-label">Vestable Amount</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(pKlimaVestable, 4)}</span> pKLIMA
            </WithPlaceholder>
          </p>
        </div>
        <div className="stake-price-data-row">
          <p className="price-label">Claimed Amount</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(termsClaimed, 4)}</span> pKLIMA
            </WithPlaceholder>
          </p>
        </div>
        <div className="stake-price-data-row">
          <p className="price-label">Max Amount</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(termsMax, 4)}</span> pKLIMA
            </WithPlaceholder>
          </p>
        </div>
      </div>
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

export default PKlima;

const WithPlaceholder = props => {
  if (props.condition) {
    return <>{props.placeholder}</>;
  }
  return props.children;
};
