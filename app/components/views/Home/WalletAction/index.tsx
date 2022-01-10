import { FC } from "react";
import { WalletProps } from "../constants";

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
      CONNECT WALLET
    </button>
  ) : (
    <button
      type="button"
      className={styles.disconnectWalletButton}
      onClick={disconnect}
    >
      DISCONNECT WALLET
    </button>
  );
};

export default WalletAction;
