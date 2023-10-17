import { Bar, BarProps } from "recharts";
import { ChartConfiguration } from "./Configuration";

const BASE_BAR_PROPS = {};

export function KlimaBarProps(props: BarProps): Omit<BarProps, "ref"> {
  return Object.assign({}, BASE_BAR_PROPS, props);
}

// Creates Recharts Stacked Bars from a ChartConfiguration
export function KlimaStackedBars<T>(configuration: ChartConfiguration<T>) {
  return configuration.map((item) => (
    <Bar
      key={item.id}
      {...KlimaBarProps({
        name: item.label,
        dataKey: item.id,
        fill: item.color,
        stackId: 1,
      })}
    />
  ));
}
