import { LegendProps } from "recharts";

import * as styles from "./styles";

const BASE_LEGEND_PROPS = {
  layout: "horizontal",
  verticalAlign: "bottom",
  align: "left",
  wrapperStyle: { marginLeft: "40px", paddingTop: "20px" },
  formatter: (value: string) => (
    <span className={styles.chartLegendText}>{value}</span>
  ),
};

export function KlimaLegendProps(props: LegendProps): LegendProps {
  // Configure payload items
  if (props.payload) {
    props.payload.forEach((payloadItem) => {
      payloadItem.type = "circle";
    });
  }
  return Object.assign({}, BASE_LEGEND_PROPS, props);
}
