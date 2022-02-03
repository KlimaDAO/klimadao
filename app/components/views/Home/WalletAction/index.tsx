import { FC } from "react";
import { WalletProps } from "../constants";
import { TextInfoTooltip } from "@klimadao/lib/components";

import styles from "../index.module.css";

const WalletAction: FC<WalletProps> = ({
  isConnected,
  loadWeb3Modal,
  disconnect,
}) => {
  return !isConnected ? (
    <button
      type="button"
      className={styles.connectWalletButton}
      onClick={loadWeb3Modal}
    >
      Connect Wallet
    </button>
  ) : (
    <TextInfoTooltip content="DISCONNECT WALLET">
      <button
        type="button"
        className={styles.disconnectWalletButton}
        onClick={disconnect}
      >
        Disconnect
      </button>
    </TextInfoTooltip>
  );
};

export default WalletAction;
