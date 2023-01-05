import orderBy from "lodash/orderBy";
import { FC } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Holding } from "components/pages/Pledge/types";

type Props = {
  data: Holding[];
};

const KLIMA_LAUNCH_UNIX_TIMESTAMP = 1634475600;
const SECONDS_IN_ONE_DAY = 86400;
const SECONDS_IN_A_FORTNIGHT = 86400 * 14;

export const HoldingsChart: FC<Props> = (props) => {
  const orderedByTimestamp = orderBy(props.data, "timestamp");
  const FIRST_TIMESTAMP = Number(orderedByTimestamp[0].timestamp);

  const data = [
    // manipulates data to generate a better chart due to lack of daily data points
    {
      date: new Date(KLIMA_LAUNCH_UNIX_TIMESTAMP * 1000),
      tokenAmount: 0,
    },
    {
      date: new Date((FIRST_TIMESTAMP - SECONDS_IN_A_FORTNIGHT) * 1000),
      tokenAmount: 0,
    },
    {
      date: new Date((FIRST_TIMESTAMP - SECONDS_IN_ONE_DAY) * 1000),
      tokenAmount: 0,
    },
    ...orderedByTimestamp.map((tx) => ({
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
          <linearGradient id="holdingsGradient" x1="0" y1="0" x2="0" y2="1">
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
          fill="url(#holdingsGradient)"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
