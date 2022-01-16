import { concatAddress } from "@klimadao/lib/utils";
import useENS from "components/hooks/useENS";
import { FC } from "react";
import { WalletProps } from "../constants";

import styles from "../index.module.css";

const WalletAction: FC<WalletProps> = ({
  address,
  isConnected,
  loadWeb3Modal,
  disconnect,
}) => {
  const { ensName, ensAvatar } = useENS(address);
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
      {ensAvatar && <img src={ensAvatar} alt={address} />}
      {ensName || concatAddress(address ?? "")}
    </button>
  );
};

export default WalletAction;
