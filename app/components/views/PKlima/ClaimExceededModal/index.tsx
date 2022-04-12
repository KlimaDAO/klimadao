import React, { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.css";
import { Trans } from "@lingui/macro";
import { ButtonPrimary, Text } from "@klimadao/lib/components";

export const ClaimExceededModal: FC = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <Text t="h2_alt">⚠ Claim exceeded.</Text>
          <Text t="body2">
            <Trans id="pklima.overclaim">
              You've claimed more KLIMA than your supply-share limit. This is
              likely due to a fix implemented on November 24th, 2021 to the
              pKLIMA redemption contract.
            </Trans>
          </Text>
          <Text t="body2">
            <Trans id="pklima.update">
              The updated contract now assumes pKLIMA holders have staked and
              earned rewards on previously claimed tokens. Prior to the November
              fix, these staking rewards were not counted against your supply
              share limit, which meant your share of the total KLIMA supply
              could surpass the limit defined in your terms.
            </Trans>
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.8rem",
          }}
        >
          <Link to="/stake">
            <ButtonPrimary label={"BACK TO APP"} />
          </Link>
        </div>
      </div>
    </div>
  );
};
