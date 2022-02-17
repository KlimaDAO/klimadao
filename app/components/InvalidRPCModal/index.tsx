import React, { FC } from "react";
import styles from "./index.module.css";
import t from "@klimadao/lib/theme/typography.module.css";
import { Anchor as A } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";

interface Props {
  onHide: () => void;
}

const METAMASK_TROUBLESHOOT_LINK =
  "https://klimadao.notion.site/Fix-LOADING-and-MetaMask-Network-RPC-Issues-ea26b4805440406c95385e57177a6407";

export const InvalidRPCModal: FC<Props> = (props) => (
  <div className={styles.bg}>
    <div className={styles.card}>
      <div className={styles.card_header}>
        <h2 className={t.h4}>⚠ Check your network settings</h2>
        <p className={t.body2}>
          The network could not be reached. This is most likely caused by an old
          Polygon RPC configuration in your wallet. See{" "}
          <A href={METAMASK_TROUBLESHOOT_LINK}>this guide</A> for a fix.
          Otherwise, reach out to us on <A href={urls.discordInvite}>Discord</A>{" "}
          if problems persist.
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "end", gap: "0.8rem" }}>
        <button onClick={props.onHide} className={styles.switchNetworkButton}>
          OK
        </button>
      </div>
    </div>
  </div>
);
