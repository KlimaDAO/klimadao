import React, { FC, useEffect, useState } from "react";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { Text } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";
import map from "lodash/map";
import groupBy from "lodash/groupBy";

import BCTIcon from "public/icons/BCT.png";
import KLIMAIcon from "public/icons/KLIMA.png";
import MCO2Icon from "public/icons/MCO2.png";
import NCTIcon from "public/icons/NCT.png";
import NBOIcon from "public/icons/NBO.png";
import UBOIcon from "public/icons/UBO.png";
import { getBalances, Balances } from "lib/getBalances";

import { Holding } from "../../../lib/subgraph";
import { BaseCard } from "../BaseCard";
import { PlaceholderHoldingsChart } from "./PlaceholderHoldingsChart";
import { HoldingsChart } from "./HoldingsChart";
import * as styles from "./styles";

type Props = {
  pageAddress: string;
  holdings: Holding[];
};

const TOKENS = ["klima", "sklima", "ubo", "nbo", "bct", "nct", "mco2"] as const;
type Token = typeof TOKENS[number];

type TokenMap = {
  [key in Token]: {
    label: string;
    icon: StaticImageData;
  };
};

const TOKEN_MAP: TokenMap = {
  klima: {
    label: "KLIMA",
    icon: KLIMAIcon,
  },
  sklima: {
    label: "sKLIMA",
    icon: KLIMAIcon,
  },
  mco2: {
    label: "MCO2",
    icon: MCO2Icon,
  },
  bct: {
    label: "BCT",
    icon: BCTIcon,
  },
  nct: {
    label: "NCT",
    icon: NCTIcon,
  },
  nbo: {
    label: "NBO",
    icon: NBOIcon,
  },
  ubo: {
    label: "UBO",
    icon: UBOIcon,
  },
};

interface TokenRowProps {
  label: string;
  icon: StaticImageData;
  balance: string | null;
  holdings: Holding[];
}

const TokenRow: FC<TokenRowProps> = (props) => {
  const formatBalance = (balance: string) =>
    Number(balance) > 0.01 ? trimStringDecimals(balance, 2) : 0;

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

export const AssetBalanceCard: FC<Props> = (props) => {
  const [balances, setBalances] = useState<Balances | null>(null);

  const holdingsByToken = groupBy(props.holdings, "token");
  const tokenHoldingAndBalances = map(TOKEN_MAP, (token, key) => ({
    ...token,
    balance: balances && balances[key as Token],
    holdings: holdingsByToken[token.label],
  }));

  useEffect(() => {
    (async () => {
      const balances = await getBalances({ address: props.pageAddress });
      setBalances(balances);
    })();
  }, []);

  return (
    <BaseCard title="Carbon Assets" icon={<CloudQueueIcon fontSize="large" />}>
      <div className={styles.tokenCardContainer}>
        {map(tokenHoldingAndBalances, (token, index) => (
          <>
            <TokenRow
              key={index}
              label={token.label}
              icon={token.icon}
              balance={token.balance}
              holdings={token.holdings}
            />

            {tokenHoldingAndBalances.length - 1 !== index && (
              <div className={styles.divider} />
            )}
          </>
        ))}
      </div>
    </BaseCard>
  );
};
