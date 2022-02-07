import { FC } from "react";
import * as styles from "./styles";

export interface Props {
  address?: string;
  isMobile?: boolean;
  isConnected: boolean;
  loadWeb3Modal: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const ConnectButton: FC<Props> = ({
  isConnected,
  loadWeb3Modal,
  disconnect,
}) => {
  return !isConnected ? (
    <button type="button" className={styles.connect} onClick={loadWeb3Modal}>
      Connect
    </button>
  ) : (
    <button type="button" className={styles.disconnect} onClick={disconnect}>
      Disconnect
    </button>
  );
};
