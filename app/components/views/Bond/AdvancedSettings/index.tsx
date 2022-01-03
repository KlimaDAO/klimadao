import React, { ChangeEventHandler, FC } from "react";

// Copied from Stake view despite T/t
import T from "@klimadao/lib/theme/typography.module.css";
import styles from "components/views/Stake/index.module.css";
import { Trans, t, defineMessage } from "@lingui/macro";
import { i18n } from "@lingui/core";

interface Props {
  slippage: number;
  recipientAddress?: string;
  onRecipientAddressChange: ChangeEventHandler<HTMLInputElement>;
  onSlippageChange: ChangeEventHandler<HTMLInputElement>;
}

export const AdvancedSettings: FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <form>
        <h5 className={t.subtitle1}>Einstein–Rosen Bridge</h5>
        <p className={t.caption}>
          <Trans id="msg.esbridge">
            Use this bridge through space-time to direct the transaction to a
            different recipient address. (default: your currently connected
            address).
          </Trans>
        </p>
        <input
          value={props.recipientAddress}
          onChange={props.onRecipientAddressChange}
          type="text"
          placeholder="Recipient Address"
          className={styles.input}
        />
      </form>
      <form>
        <h5 className={t.subtitle1}>Slippage Tolerance</h5>
        <p>
          <Trans id="msg.revert">
            Transaction may revert if price changes by more than desired slippage
            percentage.
          </Trans>
        </p>
        <div className={styles.slippageInput}>
          <input
            className={styles.input}
            value={props.slippage}
            onChange={props.onSlippageChange}
            type="number"
            max="100"
            min="1"
          />
          <div className={t.body1}>%</div>
        </div>
      </form>
    </div>
  );
};
