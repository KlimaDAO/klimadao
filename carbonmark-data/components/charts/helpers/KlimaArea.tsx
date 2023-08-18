import { AreaProps } from "recharts";

const BASE_AREA_PROPS = {
  type: "monotone",
  stackId: "1",
  connectNulls: true,
  fillOpacity: 1,
};

export function KlimaAreaProps(props: AreaProps): AreaProps {
  return Object.assign({ stroke: props.fill }, BASE_AREA_PROPS, props);
}
