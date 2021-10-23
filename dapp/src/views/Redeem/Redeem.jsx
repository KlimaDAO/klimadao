import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { trimWithPlaceholder } from "../../helpers";
import { runMigrate, changeApproval } from "../../actions/Redeem.actions";
import styles from "./Redeem.module.css";
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
function Migrate(props) {
  const { provider, address, isConnected } = props;
  const dispatch = useDispatch();

  const [view, setView] = useState("stake");
  const [quantity, setQuantity] = useState("");
  const [pending, setPending] = useState();

  const ohmBalance = useSelector(state => {
    return state.app.balances && state.app.balances.aKLIMA;
  });
  const klimaBalance = useSelector(state => {
    return state.app.balances && state.app.balances.ohm;
  });
  const sohmBalance = useSelector(state => {
    return state.app.balances && state.app.balances.alKLIMA;
  });
  const stakeAllowance = useSelector(state => {
    return state.app.migrate && state.app.migrate.aMigrate;
  });
  const unstakeAllowance = useSelector(state => {
    return state.app.migrate && state.app.migrate.alMigrate;
  });
  const isLoading = typeof stakeAllowance === 'undefined';

  const setMax = () => {
    if (view === "stake") {
      setQuantity(ohmBalance);
    } else {
      setQuantity(sohmBalance);
    }
  };

  const onSeekApproval = async token => {
    setPending(true);
    await dispatch(changeApproval({ address, token, provider, networkID: parseInt(provider.network.chainId) }));
  };

  const onMigrate = async action => {
    if (isNaN(quantity) || quantity === 0 || quantity === "") {
      alert("Please enter a value!");
    } else {
      setPending(true);
      await dispatch(
        runMigrate({
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
    if (token === "ohm") return stakeAllowance && stakeAllowance.gt(0);
    if (token === "sohm") return unstakeAllowance && unstakeAllowance.gt(0);
  };

  useEffect(() => {
    setPending(false);
  }, [stakeAllowance, unstakeAllowance, ohmBalance, klimaBalance, sohmBalance]);

  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>Redeem aKLIMA</h2>
        <p className={t.body2}>
          If you received AlphaKLIMA from the Fair Launch Auction, or AlchemistKLIMA from the Crucible rewards event,
          use this tool to redeem them for KLIMA.
        </p>
        <p className={t.body2}>
          👉{" "}
          <strong>Before proceeding: you must bridge your aKLIMA and alKLIMA tokens from Ethereum to Polygon.</strong>
        </p>
        <p className={t.body2}>
          Complete the migration at{" "}
          <a target="_blank" href="https://wallet.polygon.technology/bridge">
            wallet.polygon.technology
          </a>{" "}
          or, if you are new to this, read our{" "}
          <a
            target="_blank"
            href="https://klimadao.notion.site/How-to-bridge-AlphaKLIMA-and-AlchemistKLIMA-tokens-to-the-Polygon-network-93a59c8e639c45c3a2d296bdef5fc1d5"
          >
            tutorial for beginners
          </a>
          .
        </p>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.stakeSwitch}>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setQuantity("");
              setView("stake");
            }}
            data-active={view === "stake"}
          >
            aKLIMA
          </button>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setQuantity("");
              setView("unstake");
            }}
            data-active={view === "unstake"}
          >
            alKLIMA
          </button>
        </div>
        <div className={styles.stakeInput}>
          <input
            className={styles.stakeInput_input}
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            type="number"
            placeholder={`${{ stake: "aKLIMA", unstake: "alKLIMA" }[view]} to redeem`}
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
          <p className="price-label">Redeemable aKLIMA</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(ohmBalance, 4)}</span> aKLIMA
            </WithPlaceholder>
          </p>
        </div>
        <div className="stake-price-data-row">
          <p className="price-label">Redeemable alKLIMA</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(sohmBalance, 4)}</span> alKLIMA
            </WithPlaceholder>
          </p>
        </div>
        <div className="stake-price-data-row">
          <p className="price-label">Balance</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(klimaBalance, 4)}</span> KLIMA
            </WithPlaceholder>
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
            onMigrate("stake");
          }}
        >
          Step 2: Migrate AKLIMA
        </button>
      )}

      {!isLoading && address && hasAllowance("sohm") && view === "unstake" && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onMigrate("unstake");
          }}
        >
          Step 2: Migrate ALKLIMA
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
          Step 1: Approve AKLIMA
        </button>
      )}

      {!isLoading && address && !hasAllowance("sohm") && view === "unstake" && (
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            onSeekApproval("sohm");
          }}
        >
          Step 1: Approve ALKLIMA
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

export default Migrate;

const WithPlaceholder = props => {
  if (props.condition) {
    return <>{props.placeholder}</>;
  }
  return props.children;
};
