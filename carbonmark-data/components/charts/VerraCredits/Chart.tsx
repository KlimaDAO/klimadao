"use client"; // use client for recharts animations
import { t } from "@lingui/macro";
import { helpers } from "lib/charts";
import { VerraCreditsChartData } from "lib/charts/types";
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
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={helpers.formatDateAsMonths}
          ticks={helpers.niceTicks(props.data, "date")}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          dy={10}
        />
        <YAxis
          tickFormatter={helpers.formatQuantityAsMillionsOfTons}
          tickLine={false}
          tick={{ fontSize: 12 }}
          dx={-10}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="left"
          wrapperStyle={{ marginLeft: "40px", paddingTop: "20px" }}
          payload={[
            {
              id: "c3",
              value: "C3",
              type: "circle",
              color: palette.charts.color1,
            },
            {
              id: "moss",
              value: "Moss",
              type: "circle",
              color: palette.charts.color3,
            },
            {
              id: "toucan",
              value: "Toucan",
              type: "circle",
              color: palette.charts.color5,
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
          fill={palette.charts.color5}
          stroke={palette.charts.color5}
        />
        <Area
          type="monotone"
          name={t`Moss`}
          stackId="1"
          dataKey="moss"
          connectNulls
          stroke={palette.charts.color3}
          fill={palette.charts.color3}
          fillOpacity="1"
        />
        <Area
          type="monotone"
          name={t`C3`}
          stackId="1"
          dataKey="c3"
          connectNulls
          stroke={palette.charts.color1}
          fill={palette.charts.color1}
          fillOpacity="1"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
