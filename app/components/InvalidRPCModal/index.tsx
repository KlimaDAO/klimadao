import React, { FC } from "react";
import styles from "./index.module.css";
import t from "@klimadao/lib/theme/typography.module.css";

interface Props {
  onHide: () => void;
}

export const InvalidRPCModal: FC<Props> = ({ onHide }) => {
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.card}>
          <div className={styles.card_header}>
            <h2 className={t.h4}>⚠ Check your network settings</h2>
            <p className={t.body2}>
              The network could not be reached. This is most likely caused by an
              old Polygon RPC configuration in your wallet. See{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://klimadao.notion.site/Fix-LOADING-and-MetaMask-Network-RPC-Issues-ea26b4805440406c95385e57177a6407"
              >
                this guide
              </a>{" "}
              for a fix. Otherwise, reach out to us on{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://discord.gg/klimadao"
              >
                Discord
              </a>{" "}
              if problems persist.
            </p>
          </div>
          <div
            style={{ display: "flex", justifyContent: "end", gap: "0.8rem" }}
          >
            <button onClick={onHide} className={styles.switchNetworkButton}>
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
