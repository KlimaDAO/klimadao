import { FC } from "react";
import { WalletProps } from "../constants";

import styles from "../index.module.css";

const WalletAction: FC<WalletProps> = ({
  isMobile,
  isConnected,
  loadWeb3Modal,
  disconnect,
}) => {
  return !isConnected ? (
    <button
      type="button"
      className={styles[`connectWalletButton${isMobile ? "Mobile" : ""}`]}
      onClick={loadWeb3Modal}
    >
      CONNECT WALLET
    </button>
  ) : (
    <button
      type="button"
      className={styles[`disconnectWalletButton${isMobile ? "Mobile" : ""}`]}
      onClick={disconnect}
    >
      DISCONNECT WALLET
    </button>
  );
};

export default WalletAction;
