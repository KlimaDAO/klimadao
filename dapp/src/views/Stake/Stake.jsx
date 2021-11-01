import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { secondsUntilBlock, prettifySeconds, trimWithPlaceholder, concatAddress } from "../../helpers";
import {
  changeApprovalTransaction,
  changeStakeTransaction,
  incrementStake,
  decrementStake,
  incrementStakeApproval,
  incrementUnstakeApproval,
} from "../../actions/Stake.actions";
import styles from "./Stake.module.css";
import t from "../../styles/typography.module.css";
import { Spinner } from "../../components/Spinner";

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
function Stake(props) {
  const { provider, address, isConnected } = props;
  const dispatch = useDispatch();

  const [view, setView] = useState("stake");
  const [status, setStatus] = useState(""); // "userConfirmation", "networkConfirmation", "done", "userRejected, "error"
  const [quantity, setQuantity] = useState("");

  const fiveDayRate = useSelector(state => {
    return state.app.fiveDayRate;
  });
  const currentIndex = useSelector(state => {
    return state.app.currentIndex;
  });

  const ohmBalance = useSelector(state => {
    return state.app.balances && state.app.balances.ohm;
  });
  const sohmBalance = useSelector(state => {
    return state.app.balances && state.app.balances.sohm;
  });
  const stakeAllowance = useSelector(state => {
    return state.app.staking && state.app.staking.ohmStake;
  });
  const unstakeAllowance = useSelector(state => {
    return state.app.staking && state.app.staking.ohmUnstake;
  });
  const stakingRebase = useSelector(state => {
    return state.app.stakingRebase;
  });
  const stakingAPY = useSelector(state => {
    return state.app.stakingAPY;
  });
  const currentBlock = useSelector(state => {
    return state.app.currentBlock;
  });

  const rebaseBlock = useSelector(state => {
    return state.app.staking && state.app.staking.rebaseBlock;
  });

  const isLoading = typeof stakeAllowance === "undefined";

  const setMax = () => {
    setStatus("");
    if (view === "stake") {
      setQuantity(ohmBalance);
    } else {
      setQuantity(sohmBalance);
    }
  };

  const handleApproval = action => async () => {
    try {
      const value = await changeApprovalTransaction({
        provider,
        networkID: 137,
        action,
        onStatus: setStatus,
      });
      dispatch(action === "stake" ? incrementStakeApproval(value) : incrementUnstakeApproval(value));
    } catch (e) {
      return;
    }
  };

  const handleStake = action => async () => {
    try {
      const value = quantity.toString();
      setQuantity("");
      await changeStakeTransaction({
        value,
        provider,
        networkID: 137,
        action,
        onStatus: setStatus,
      });
      dispatch(action === "stake" ? incrementStake(value) : decrementStake(value));
    } catch (e) {
      return;
    }
  };

  const hasAllowance = action => {
    if (action === "stake") return stakeAllowance && stakeAllowance.gt(0);
    if (action === "unstake") return unstakeAllowance && unstakeAllowance.gt(0);
  };

  const timeUntilRebase = () => {
    if (currentBlock) {
      const seconds = secondsUntilBlock(currentBlock, rebaseBlock);
      return prettifySeconds(seconds);
    }
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
    } else if (view === "stake" && !hasAllowance("stake")) {
      return { children: "Approve", onClick: handleApproval("stake") };
    } else if (view === "unstake" && !hasAllowance("unstake")) {
      return { children: "Approve", onClick: handleApproval("unstake") };
    } else if (view === "stake" && hasAllowance("stake")) {
      return { children: "Stake", onClick: handleStake("stake"), disabled: !value || value > ohmBalance };
    } else if (view === "unstake" && hasAllowance("unstake")) {
      return { children: "Unstake", onClick: handleStake("unstake"), disabled: !value || value > sohmBalance };
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

  const showSpinner = isConnected && (status === "userConfirmation" || status === "networkConfirmation" || isLoading);

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>Stake KLIMA.</h2>
        <p className={t.body2}>
          Hold, stake, and compound. If the protocol earns a profit selling carbon bonds, these rewards are shared among
          all holders of sKLIMA (staked KLIMA).
        </p>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.stakeSwitch}>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setQuantity("");
              setStatus("");
              setView("stake");
            }}
            data-active={view === "stake"}
          >
            Stake
          </button>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setQuantity("");
              setStatus("");
              setView("unstake");
            }}
            data-active={view === "unstake"}
          >
            Unstake
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
            placeholder={`Amount to ${{ stake: "stake", unstake: "unstake" }[view]}`}
            min="0"
          />
          <button className={styles.stakeInput_button} type="button" onClick={setMax}>
            Max
          </button>
        </div>
      </div>

      <div className={styles.dataContainer}>
        {address && <p className={styles.dataContainer_address}>{concatAddress(address)}</p>}
        <div className="stake-price-data-row">
          <p className="price-label">Balance</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(ohmBalance, 4)}</span> KLIMA
            </WithPlaceholder>
          </p>
        </div>

        <div className="stake-price-data-row">
          <p className="price-label">Staked</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(sohmBalance, 4)}</span> sKLIMA
            </WithPlaceholder>
          </p>
        </div>
        <div className="stake-price-data-row">
          <p className="price-label">Time until rebase</p>
          <p className="price-data">
            <span>{timeUntilRebase()}</span>
          </p>
        </div>

        <div className="stake-price-data-row">
          <p className="price-label">Next Rebase</p>
          <p className="price-data">
            <span>{trimWithPlaceholder(stakingRebase * 100, 2)}</span>%
          </p>
        </div>

        <div className="stake-price-data-row">
          <p className="price-label">ROI (5-day rate)</p>
          <p className="price-data">
            <span>{trimWithPlaceholder(fiveDayRate * 100, 2)}</span>%
          </p>
        </div>

        <div className="stake-price-data-row">
          <p className="price-label">APY</p>
          <p className="price-data">
            <span>{trimWithPlaceholder(stakingAPY * 100, 2)}</span>%
          </p>
        </div>

        <div className="stake-price-data-row">
          <p className="price-label">Current index</p>
          <p className="price-data">
            <span>{trimWithPlaceholder(currentIndex, 4)}</span> KLIMA
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

export default Stake;

const WithPlaceholder = props => {
  if (props.condition) {
    return <>{props.placeholder}</>;
  }
  return props.children;
};
