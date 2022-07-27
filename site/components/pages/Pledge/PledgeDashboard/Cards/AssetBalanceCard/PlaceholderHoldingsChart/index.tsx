import React, { FC } from "react";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const PlaceholderHoldingsChart: FC = () => {
  const data = [
    {
      date: new Date(1634475600 * 1000),
      tokenAmount: 33,
    },
    {
      date: new Date(),
      tokenAmount: 33,
    },
  ];

  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="nullGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--font-03)" stopOpacity={0.33} />
            <stop offset="100%" stopColor="var(--font-03)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <XAxis hide={true} dataKey="date" />
        <YAxis hide={true} domain={[0, 100]} />
        <Tooltip />
        <Area
          isAnimationActive={true}
          type="linear"
          dataKey="tokenAmount"
          stroke="var(--font-03)"
          fillOpacity={0.6}
          fill="url(#nullGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
