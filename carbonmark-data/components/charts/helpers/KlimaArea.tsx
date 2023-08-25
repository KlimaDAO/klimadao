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
export function KlimaStackedAreas<T>(configuration: ChartConfiguration<T>) {
  return configuration.map((item) => (
    <Area
      key={item.id}
      {...KlimaAreaProps({
        name: item.label,
        dataKey: item.id,
        fill: item.color,
      })}
    />
  ));
}
