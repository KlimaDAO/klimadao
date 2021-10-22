import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { secondsUntilBlock, prettifySeconds, trimWithPlaceholder } from "../../helpers";
import { changeStake, changeApproval, changeApprovalGasLess } from "../../actions/Stake.actions";
import styles from "./Stake.module.css";
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
function Stake(props) {
  const { provider, address, isConnected } = props;
  const dispatch = useDispatch();

  const [view, setView] = useState("stake");
  const [quantity, setQuantity] = useState("");
  const [pending, setPending] = useState(false);

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
  })


  const isLoading = typeof stakeAllowance === "undefined";

  const setMax = () => {
    if (view === "stake") {
      setQuantity(ohmBalance);
    } else {
      setQuantity(sohmBalance);
    }
  };

  const onSeekApproval = async token => {
    await dispatch(changeApproval({ address, token, provider, networkID: parseInt(provider.network.chainId) }));
    setPending(true);
  };

  const onChangeStake = async action => {
    if (isNaN(quantity) || quantity === 0 || quantity === "") {
      alert("Please enter a value!");
    } else {
      setPending(true);
      setQuantity("");
      dispatch(
        changeStake({
          address,
          action,
          value: quantity.toString(),
          provider,
          networkID: parseInt(provider.network.chainId),
        }),
      );
    }
  };
  useEffect(() => {
    setPending(false);
  }, [stakeAllowance, unstakeAllowance, ohmBalance, sohmBalance]);

  const hasAllowance = token => {
    if (token === "ohm") return stakeAllowance && stakeAllowance.gt(0);
    if (token === "sohm") return unstakeAllowance && unstakeAllowance.gt(0);
  };

  const timeUntilRebase = () => {
    if (currentBlock) {
      const seconds = secondsUntilBlock(currentBlock, rebaseBlock);
      return prettifySeconds(seconds);
    }
  };

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
            onChange={e => setQuantity(e.target.value)}
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
        {address && (
          <p className={styles.dataContainer_address}>
            {address.slice(0, 5)}..{address.slice(address.length - 3)}
          </p>
        )}
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

      {isConnected && isLoading && (
        <button type="button" style={{ opacity: 0.5 }} className={styles.submitButton}>
          Loading...
        </button>
      )}

      {!isLoading && address && hasAllowance("ohm") && view === "stake" && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onChangeStake("stake");
          }}
        >
          Stake KLIMA
        </button>
      )}

      {!isLoading && address && hasAllowance("sohm") && view === "unstake" && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onChangeStake("unstake");
          }}
        >
          Unstake KLIMA
        </button>
      )}

      {!isLoading && address && !hasAllowance("ohm") && view === "stake" && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onSeekApproval("ohm");
          }}
        >
          Approve KLIMA
        </button>
      )}
      {/* {address && !hasAllowance("ohm") && view === "stake" && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onSeekApprovalGasless("ohm");
          }}
        >
          Approve KLIMA Gasless (aka for FREE)
        </button>
      )} */}

      {!isLoading && address && !hasAllowance("sohm") && view === "unstake" && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onSeekApproval("sohm");
          }}
        >
          Approve sKLIMA
        </button>
      )}
      {pending && (
        <p style={{ textAlign: "center" }}>
          Please click 'confirm' in your wallet, and wait a few seconds for the network to confirm the transaction.
        </p>
      )}
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
