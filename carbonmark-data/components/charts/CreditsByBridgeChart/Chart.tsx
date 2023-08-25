"use client"; // use client for recharts animations
import { AggregatedCreditsChartData, Bridge } from "lib/charts/types";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { KlimaLegendProps } from "../helpers";
import { ChartConfiguration } from "../helpers/Configuration";

interface Props {
  data: AggregatedCreditsChartData;
  configuration: ChartConfiguration<Bridge>;
}
export default function Chart(props: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={730} height={250}>
        <Pie
          data={props.data}
          dataKey="quantity"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
        >
          {props.data.map((entry) => (
            <Cell key={entry.id} fill={entry.color} />
          ))}
        </Pie>
        <Legend
          {...KlimaLegendProps(props.configuration)}
          verticalAlign="middle"
          align="center"
          layout="vertical"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
