import React, { FC } from "react";
import orderBy from "lodash/orderBy";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Holding } from "../../../../lib/subgraph";

type Props = {
  data: Holding[];
};

export const HoldingsChart: FC<Props> = (props) => {
  const data = [
    {
      timestamp: 1634475600,
      date: new Date(1634475600 * 1000),
      tokenAmount: 0,
    },
    {
      timestamp: Number(props.data[0].timestamp) - 1209600,
      date: new Date((Number(props.data[0].timestamp) - 1209600) * 1000),
      tokenAmount: 0,
    },
    {
      timestamp: Number(props.data[0].timestamp) - 864000,
      date: new Date((Number(props.data[0].timestamp) - 864000) * 1000),
      tokenAmount: 0,
    },
    ...props.data.map((tx) => ({
      timestamp: tx.timestamp,
      date: new Date(Number(tx.timestamp) * 1000),
      tokenAmount: tx.tokenAmount,
    })),
  ];

  // calculate chart boundaries
  const tokenValues = props.data.map((tx) =>
    Math.floor(Number(tx.tokenAmount))
  );
  const maxValue = orderBy(tokenValues)[tokenValues.length - 1] * 1.01;

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
