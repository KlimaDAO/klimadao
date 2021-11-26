import React, { FC } from "react";
import styles from "./index.module.css";
import t from "@klimadao/lib/theme/typography.module.css";
import { Link } from "react-router-dom";

export const ClaimExceededModal: FC = () => {
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.card}>
          <div className={styles.card_header}>
            <h2 className={t.h4}>⚠ Claim exceeded.</h2>
            <p className={t.body2}>
              You've claimed more KLIMA than your supply-share limit. This is
              likely due to a fix implemented on November 24th, 2021 to the
              pKLIMA redemption contract.
            </p>
            <p className={t.body2}>
              The updated contract now assumes pKLIMA holders have staked and
              earned interest on previously claimed tokens. Prior to the
              November fix, these staking rewards were not counted against your
              supply share limit, which meant your share of the total KLIMA
              supply could surpass the limit defined in your terms.
            </p>
            <p className={t.body2}>
              It may be a few days, depending on the KLIMA growth rate, before
              you can access this page and continue redeeming pKLIMA.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.8rem",
            }}
          >
            <Link to="/stake">
              <button className={styles.backButton}>BACK TO APP</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
