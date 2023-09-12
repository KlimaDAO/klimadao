import { Bar, BarProps } from "recharts";
import { ChartConfiguration } from "./Configuration";

const BASE_AREA_PROPS = {};

export function KlimaBarProps(props: BarProps): Omit<BarProps, "ref"> {
  return Object.assign({}, BASE_AREA_PROPS, props);
}

// Creates Recharts Stacked Bars from a ChartConfiguration
export function KlimaStackedBars<Q, M, T>(
  configuration: ChartConfiguration<Q, M, T>
) {
  return configuration.map((item) => (
    <Bar
      key={item.chartOptions.id}
      {...KlimaBarProps({
        name: item.chartOptions.label,
        dataKey: item.chartOptions.id,
        fill: item.chartOptions.color,
        stackId: 1,
      })}
    />
  ));
}
