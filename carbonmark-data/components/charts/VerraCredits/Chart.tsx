"use client"; // use client for recharts animations
import { t } from "@lingui/macro";
import { helpers } from "lib/charts";
import { VerraCreditsChartData } from "lib/charts/getVerraCredits";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { palette } from "theme/palette";
import * as styles from "../styles";

interface Props {
  data: VerraCreditsChartData;
}
export default function Chart(props: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={props.data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={helpers.formatDateAsMonths}
          ticks={helpers.niceTicks(props.data)}
          tickLine={false}
        />
        <YAxis
          tickFormatter={helpers.formatQuantityAsMillions}
          tickLine={false}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="left"
          payload={[
            {
              id: "toucan",
              value: "Toucan",
              type: "circle",
              color: palette.charts.color1,
            },
            {
              id: "moss",
              value: "Moss",
              type: "circle",
              color: palette.charts.color4,
            },
            {
              id: "c3",
              value: "C3",
              type: "circle",
              color: palette.charts.color7,
            },
          ]}
          formatter={(value) => (
            <span className={styles.chartLegendText}>{value}</span>
          )}
        />
        <Tooltip />
        <Area
          type="monotone"
          name={t`Toucan`}
          stackId="1"
          dataKey="toucan"
          connectNulls
          fillOpacity="1"
          fill={palette.charts.color1}
          stroke={palette.charts.color1}
        />
        <Area
          type="monotone"
          name={t`Moss`}
          stackId="1"
          dataKey="moss"
          connectNulls
          stroke={palette.charts.color4}
          fill={palette.charts.color4}
          fillOpacity="1"
        />
        <Area
          type="monotone"
          name={t`C3`}
          stackId="1"
          dataKey="c3"
          connectNulls
          stroke={palette.charts.color7}
          fill={palette.charts.color7}
          fillOpacity="1"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
