import React, { FC } from "react";
import styles from "./index.module.css";
import t from "@klimadao/lib/theme/typography.module.css";

/**
 * Due to problems with react-router (needed for IPFS) and next.js isomorphic rendering,
 * return this placeholder view until the app mounts and the correct view can be resolved.
 */
export const Loading: FC = () => {
  return (
    <div className={styles.stakeCard}>
      <div className={styles.stakeCard_header}>
        <h2 className={t.h4}>{"Loading..."}</h2>
        <p className={t.body2}>Preparing the dApp for you...</p>
      </div>
    </div>
  );
};
