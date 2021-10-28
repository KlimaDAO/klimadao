import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { trimWithPlaceholder } from "../../helpers";
import {
  decrementAklima,
  decrementAlklima,
  changeApprovalTransaction,
  redeemTransaction,
  incrementAklimaApproval,
  incrementAlklimaApproval,
} from "../../actions/Redeem.actions";
import styles from "../Stake/Stake.module.css";
import t from "../../styles/typography.module.css";
import { Spinner } from "../../components/Spinner";

function Migrate(props) {
  const { provider, address, isConnected } = props;
  const dispatch = useDispatch();
  const [status, setStatus] = useState(""); // "userConfirmation", "networkConfirmation", "done", "userRejected, "error"
  const [view, setView] = useState("aKLIMA"); // aKLIMA alKLIMA
  const [quantity, setQuantity] = useState("");

  const klimaBalance = useSelector(state => {
    return state.app.balances && state.app.balances.ohm;
  });
  const aKLIMABalance = useSelector(state => {
    return state.app.balances && state.app.balances.aKLIMA;
  });
  const alKLIMABalance = useSelector(state => {
    return state.app.balances && state.app.balances.alKLIMA;
  });
  const aKlimaAllowance = useSelector(state => {
    return state.app.migrate && state.app.migrate.aKlimaAllowance;
  });
  const alKlimaAllowance = useSelector(state => {
    return state.app.migrate && state.app.migrate.alKlimaAllowance;
  });
  const isLoading = typeof klimaBalance === "undefined";
  const showSpinner = isConnected && (status === "userConfirmation" || status === "networkConfirmation" || isLoading);

  const setMax = () => {
    setStatus("");
    if (view === "aKLIMA") {
      setQuantity(aKLIMABalance);
    } else {
      setQuantity(alKLIMABalance);
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
      dispatch(action === "aKLIMA" ? incrementAklimaApproval(value) : incrementAlklimaApproval(value));
    } catch (e) {
      return;
    }
  };

  const handleRedeem = action => async () => {
    try {
      const value = quantity.toString();
      setQuantity("");
      await redeemTransaction({
        action,
        provider,
        networkID: 137,
        value,
        onStatus: setStatus,
      });
      dispatch(action === "aKLIMA" ? decrementAklima(value) : decrementAlklima(value));
    } catch (e) {
      return;
    }
  };

  const hasAllowance = token => {
    if (token === "aKLIMA") return aKlimaAllowance && aKlimaAllowance > 0;
    return alKlimaAllowance && alKlimaAllowance > 0;
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
    } else if (view === "aKLIMA" && !hasAllowance("aKLIMA")) {
      return { children: "Approve", onClick: handleApproval("aKLIMA") };
    } else if (view === "alKLIMA" && !hasAllowance("alKLIMA")) {
      return { children: "Approve", onClick: handleApproval("alKLIMA") };
    } else if (view === "aKLIMA") {
      return { children: "Redeem", onClick: handleRedeem("aKLIMA"), disabled: !value || value > aKLIMABalance };
    } else if (view === "alKLIMA") {
      return { children: "Redeem", onClick: handleRedeem("alKLIMA"), disabled: !value || value > alKLIMABalance };
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
              setView("aKLIMA");
            }}
            data-active={view === "aKLIMA"}
          >
            aKLIMA
          </button>
          <button
            className={styles.switchButton}
            type="button"
            onClick={() => {
              setQuantity("");
              setView("alKLIMA");
            }}
            data-active={view === "alKLIMA"}
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
            placeholder={`${{ aKLIMA: "aKLIMA", alKLIMA: "alKLIMA" }[view]} to redeem`}
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
              <span>{trimWithPlaceholder(aKLIMABalance, 4)}</span> aKLIMA
            </WithPlaceholder>
          </p>
        </div>
        <div className="stake-price-data-row">
          <p className="price-label">Redeemable alKLIMA</p>
          <p className="price-data">
            <WithPlaceholder condition={!isConnected} placeholder="NOT CONNECTED">
              <span>{trimWithPlaceholder(alKLIMABalance, 4)}</span> alKLIMA
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

export default Migrate;

const WithPlaceholder = props => {
  if (props.condition) {
    return <>{props.placeholder}</>;
  }
  return props.children;
};
