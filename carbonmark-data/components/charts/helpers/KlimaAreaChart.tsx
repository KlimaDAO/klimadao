import { Area, AreaProps } from "recharts";
import { ChartConfiguration } from "./Configuration";

const BASE_AREA_PROPS = {
  type: "monotone",
  stackId: "1",
  connectNulls: true,
  fillOpacity: 1,
};

export function KlimaAreaProps(props: AreaProps): Omit<AreaProps, "ref"> {
  return Object.assign({ stroke: props.fill }, BASE_AREA_PROPS, props);
}

// Creates Recharts Stacked Areas from a ChartConfiguration
export function KlimaStackedAreas<Q, M, T>(
  configuration: ChartConfiguration<Q, M, T>
) {
  return configuration.map((item) => (
    <Area
      key={item.chartOptions.id}
      {...KlimaAreaProps({
        name: item.chartOptions.label,
        dataKey: item.chartOptions.id,
        fill: item.chartOptions.color,
      })}
    />
  ));
}
