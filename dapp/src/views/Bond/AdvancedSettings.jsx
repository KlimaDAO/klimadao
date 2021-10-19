import React from "react";
import t from "../../styles/typography.module.css";
import styles from "./AdvancedSettings.module.css";

function AdvancedSettings({ slippage, recipientAddress, onRecipientAddressChange, onSlippageChange }) {
  return (
    <div className={styles.container}>
      <form>
        <h5 className={t.subtitle1}>Einstein–Rosen Bridge</h5>
        <p className={t.caption}>
          Use this bridge through space-time to direct the transaction to a different recipient address. (default: your
          currently connected address).
        </p>
        <input
          value={recipientAddress}
          onChange={onRecipientAddressChange}
          type="text"
          placeholder="Recipient Address"
          className={styles.input}
        />
      </form>
      <form>
        <h5 className={t.subtitle1}>Slippage Tolerance</h5>
        <p>Transaction may revert if price changes by more than desired slippage percentage.</p>
        <div className={styles.slippageInput}>
          <input
            className={styles.input}
            value={slippage}
            onChange={onSlippageChange}
            type="number"
            max="100"
            min="1"
          />
          <div className={t.body1}>%</div>
        </div>
      </form>
    </div>
  );
}

export default AdvancedSettings;
