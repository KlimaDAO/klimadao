import React, { FC } from "react";
import { useRouter } from "next/router";
import { Text } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";

import { Holding } from "components/pages/Pledge/types";
import { PlaceholderHoldingsChart } from "../PlaceholderHoldingsChart";
import { HoldingsChart } from "../HoldingsChart";
import * as styles from "./styles";

interface TokenRowProps {
  label: string;
  icon: StaticImageData;
  balance: string | null;
  holdings: Holding[];
}

export const TokenRow: FC<TokenRowProps> = (props) => {
  const { locale } = useRouter();
  const formatBalance = (balance: string) =>
    Number(balance) > 0.01
      ? Number(trimStringDecimals(balance, 2)).toLocaleString(locale)
      : 0;

  return (
    <div className={styles.tokenRow}>
      <div className={styles.tokenHoldings}>
        <img src={props.icon.src} alt={`${props.label} token`} />

        {props.balance ? (
          <div className={styles.tokenBalance}>
            <Text t="h4">{formatBalance(props.balance)} </Text>
            <Text t="h4" color="lightest">
              {props.label}
            </Text>
          </div>
        ) : (
          <Text t="h4" color="lightest">
            Loading...
          </Text>
        )}
      </div>

      {props.holdings ? (
        <div className={styles.holdingsChart}>
          <HoldingsChart data={props.holdings} />
        </div>
      ) : (
        <div className={styles.holdingsChart}>
          <PlaceholderHoldingsChart />
        </div>
      )}
    </div>
  );
};
