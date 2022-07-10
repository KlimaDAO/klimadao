import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { Text } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";
import last from "lodash/last";
import max from "lodash/max";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";

import BCTIcon from "public/icons/BCT.png";
import KlimaIcon from "public/icons/KLIMA.png";
import MCO2Icon from "public/icons/MCO2.png";
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
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const HoldingsOverTimeChart = (props) => {
  console.log(props.data);
  const data = props.data.map((tx) => ({
    timestamp: tx.timestamp,
    date: new Date(tx.timestamp * 1000),
    tokenAmount: tx.tokenAmount,
  }));

  const tokenValues = props.data.map((tx) => Math.floor(tx.tokenAmount));
  const maxValue = last(orderBy(tokenValues)) * 1.01;

  // console.log(maxValue);

  return (
    <ResponsiveContainer width={300} height={80}>
      <AreaChart data={props.data}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="10%"
              stopColor="var(--klima-green)"
              stopOpacity={0.75}
            />
            <stop offset="95%" stopColor="var(--klima-green)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis hide={true} dataKey="date" />
        <YAxis hide={true} domain={[0, maxValue]} />
        <Tooltip />
        <Area
          isAnimationActive={true}
          type="monotone"
          dataKey="tokenAmount"
          stroke="var(--klima-green)"
          fillOpacity={1}
          fill="url(#gradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const AssetBalanceCard: FC<Props> = (props) => {
  const [balances, setBalances] = useState<Balances | null>(null);

  const holdingsByToken = groupBy(props.holdings, "token");
  console.log(props.holdings);

  const formatBalance = (balance: string) =>
    Number(balance) > 0.01 ? trimStringDecimals(balance, 2) : 0;

  useEffect(() => {
    (async () => {
      const balances = await getBalances({
        address: props.pageAddress,
      });
      setBalances(balances);
    })();
  }, []);

  return (
    <BaseCard title="Carbon Assets" icon={<CloudQueueIcon fontSize="large" />}>
      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={KlimaIcon} alt="Klima" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            {balances ? (
              <>
                <Text t="h4" as="span">
                  {formatBalance(balances.klima)}{" "}
                </Text>
                <Text t="h4" as="span" color="lightest" uppercase>
                  Klima
                </Text>
              </>
            ) : (
              <Text t="h4" color="lightest">
                Loading...
              </Text>
            )}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={KlimaIcon} alt="sKlima" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            {balances ? (
              <>
                <Text t="h4" as="span">
                  {formatBalance(balances.sklima)}{" "}
                </Text>
                <Text t="h4" as="span" color="lightest">
                  s
                </Text>
                <Text t="h4" as="span" color="lightest" uppercase>
                  Klima
                </Text>
              </>
            ) : (
              <Text t="h4" color="lightest">
                Loading...
              </Text>
            )}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={MCO2Icon} alt="MCO2" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            {balances ? (
              <>
                <Text t="h4" as="span">
                  {formatBalance(balances.mco2)}{" "}
                </Text>
                <Text t="h4" as="span" color="lightest" uppercase>
                  MCO2
                </Text>
              </>
            ) : (
              <Text t="h4" color="lightest">
                Loading...
              </Text>
            )}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.tokenRow}>
        <Image height={48} width={48} src={BCTIcon} alt="BCT" />
        <div className={styles.tokenHoldings}>
          <Text t="caption">Holding</Text>
          <div>
            {balances ? (
              <>
                <Text t="h4" as="span">
                  {formatBalance(balances.bct)}{" "}
                </Text>
                <Text t="h4" as="span" color="lightest" uppercase>
                  BCT
                </Text>
              </>
            ) : (
              <Text t="h4" color="lightest">
                Loading...
              </Text>
            )}
          </div>
        </div>
        <HoldingsOverTimeChart data={holdingsByToken.BCT} />
      </div>
    </BaseCard>
  );
};
