import { Line, LineProps } from "recharts";
import { ChartConfiguration } from "./Configuration";

const BASE_AREA_PROPS = {
  type: "monotone",
  connectNulls: true,
  dot: false,
};

export function KlimaLineProps(props: LineProps): Omit<LineProps, "ref"> {
  return Object.assign({}, BASE_AREA_PROPS, props);
}

// Creates Recharts Lines from a ChartConfiguration
export function KlimaLines<T>(configuration: ChartConfiguration<T>) {
  return configuration.map((item) => (
    <Line
      key={item.id}
      {...KlimaLineProps({
        name: item.label,
        dataKey: item.id,
        stroke: item.color,
      })}
    />
  ));
}
