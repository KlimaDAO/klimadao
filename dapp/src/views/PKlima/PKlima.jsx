import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { trimWithPlaceholder } from "../../helpers";
import { runExercise, changeApproval } from "../../actions/PKlima.actions";
import styles from "./PKlima.module.css";
import t from "../../styles/typography.module.css";

/**
 * @typedef {Object} Props
 * @property {any} provider
 * @property {string} address
 * @property {boolean} isConnected
 */

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
function PKlima(props) {
  const { provider, address, isConnected } = props;
  const dispatch = useDispatch();

  const [view, setView] = useState("stake");
  const [quantity, setQuantity] = useState("");

  const ohmBalance = useSelector(state => {
    return state.app.balances && state.app.balances.pKLIMA;
  });
  const sohmBalance = useSelector(state => {
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

  const setMax = () => {
    setQuantity(pKlimaVestable);
  };

  const onSeekApproval = async token => {
    await dispatch(changeApproval({ address, token, provider, networkID: parseInt(provider.network.chainId) }));
  };

  const onExercise = async action => {
    if (isNaN(quantity) || quantity === 0 || quantity === "") {
      alert("Please enter a value!");
    } else {
      await dispatch(
        runExercise({
          address,
          action,
          value: quantity.toString(),
          provider,
          networkID: parseInt(provider.network.chainId),
        }),
      );
    }
  };

  const hasAllowance = token => {
    if (token === "pklima") return pAllowance && pAllowance.gt(0);
    if (token === "bct") return bctAllowance && bctAllowance.gt(0);
  };

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>Exercise pKLIMA</h2>
        <p className={t.body2}>
          Exercise your pKLIMA for KLIMA using a BCT
          <br />1 pKLIMA + 1 BCT = 1 KLIMA
        </p>
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
            onChange={e => setQuantity(e.target.value)}
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
                <span>{trimWithPlaceholder(ohmBalance, 4)}</span> pKLIMA
              </WithPlaceholder>
            </p>
          </div>
        )}
        <div className="stake-price-data-row">
          <p className="price-label">BCT Balance</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(sohmBalance, 4)}</span> BCT
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

      {isConnected && isLoading && (
        <button type="button" style={{ opacity: 0.5 }} className={styles.submitButton}>
          Loading...
        </button>
      )}

      {!isLoading && !hasAllowance("pklima") && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onSeekApproval("pklima");
          }}
        >
          Step 1: Approve pKLIMA
        </button>
      )}
      {!isLoading && hasAllowance("pklima") && !hasAllowance("bct") && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onSeekApproval("bct");
          }}
        >
          Step 2: Approve BCT
        </button>
      )}
      {!isLoading && hasAllowance("pklima") && hasAllowance("bct") && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onExercise("stake");
          }}
        >
          Step 3: Exercise pKLIMA
        </button>
      )}
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
