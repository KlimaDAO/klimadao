import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { Text } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";
import last from "lodash/last";
import map from "lodash/map";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";

import BCTIcon from "public/icons/BCT.png";
import KLIMAIcon from "public/icons/KLIMA.png";
import MCO2Icon from "public/icons/MCO2.png";
import NCTIcon from "public/icons/NCT.png";
import NBOIcon from "public/icons/NBO.png";
import UBOIcon from "public/icons/UBO.png";

import { getBalances, Balances } from "lib/getBalances";

import { BaseCard } from "../BaseCard";
import * as styles from "./styles";

type Props = {
  pageAddress: string;
};

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const HoldingsOverTimeChart = (props) => {
  console.log(props.data);
  const data = [
    // {
    //   timestamp: 1634475600,
    //   date: new Date(1634475600 * 1000),
    //   tokenAmount: 0,
    // },
    // {
    //   timestamp: props.data[0].timestamp - 1209600,
    //   date: new Date((props.data[0].timestamp - 1209600) * 1000),
    //   tokenAmount: 0,
    // },
    ...props.data.map((tx) => ({
      timestamp: tx.timestamp,
      date: new Date(tx.timestamp * 1000),
      tokenAmount: tx.tokenAmount,
    })),
  ];

  console.log(data);
  const tokenValues = props.data.map((tx) => Math.floor(tx.tokenAmount));
  const maxValue = last(orderBy(tokenValues)) * 1.01;

  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--klima-green)"
              stopOpacity={0.5}
            />
            <stop
              offset="100%"
              stopColor="var(--klima-green)"
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>
        <XAxis hide={true} dataKey="date" />
        <YAxis hide={true} domain={[0, maxValue]} />
        <Tooltip />
        <Area
          isAnimationActive={true}
          type="linear"
          dataKey="tokenAmount"
          stroke="var(--klima-green)"
          fillOpacity={0.6}
          fill="url(#gradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const TOKENS = [
  {
    name: "KLIMA",
    icon: KLIMAIcon,
  },
  {
    name: "sKLIMA",
    icon: KLIMAIcon,
  },
  {
    name: "MCO2",
    icon: MCO2Icon,
  },
  {
    name: "BCT",
    icon: BCTIcon,
  },
  {
    name: "NCT",
    icon: NCTIcon,
  },
  {
    name: "NBO",
    icon: NBOIcon,
  },
  {
    name: "UBO",
    icon: UBOIcon,
  },
];

const AssetRow = (props) => {
  const formatBalance = (balance: string) =>
    Number(balance) > 0.01 ? trimStringDecimals(balance, 2) : 0;

  return (
    <div className={styles.tokenRow}>
      <div className={styles.tokenBalance}>
        <div className={styles.tokenHoldings}>
          <Image
            height={48}
            width={48}
            src={props.icon}
            alt={`${props.name} token`}
          />

          {props.balance ? (
            <>
              <Text t="h4" as="span">
                {formatBalance(props.balance)}{" "}
              </Text>
              <Text t="h4" as="span" color="lightest">
                {props.name}
              </Text>
            </>
          ) : (
            <Text t="h4" color="lightest">
              Loading...
            </Text>
          )}
        </div>
      </div>

      {props.holdings && (
        <div className={styles.holdingsChart}>
          <HoldingsOverTimeChart data={props.holdings} />
        </div>
      )}
    </div>
  );
};

export const AssetBalanceCard: FC<Props> = (props) => {
  const [balances, setBalances] = useState<Balances | null>(null);

  const holdingsByToken = groupBy(props.holdings, "token");
  const tokenHoldingAndBalances = map(TOKENS, (token) => ({
    ...token,
    balance: balances && balances[token.name.toLowerCase()],
    holdings: holdingsByToken[token.name],
  }));

  useEffect(() => {
    (async () => {
      const balances = await getBalances({ address: props.pageAddress });
      setBalances(balances);
    })();
  }, []);

  return (
    <BaseCard title="Carbon Assets" icon={<CloudQueueIcon fontSize="large" />}>
      {map(tokenHoldingAndBalances, (token, index) => (
        <>
          <AssetRow
            key={index}
            name={token.name}
            icon={token.icon}
            balance={token.balance}
            holdings={token.holdings}
          />

          {tokenHoldingAndBalances.length - 1 !== index && (
            <div className={styles.divider} />
          )}
        </>
      ))}
    </BaseCard>
  );
};
