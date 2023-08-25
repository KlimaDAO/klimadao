import { LegendProps } from "recharts";
import { ChartConfiguration } from "./Configuration";
import * as styles from "./styles";

const BASE_LEGEND_PROPS = {
  formatter: (value: string) => (
    <span className={styles.chartLegendText}>{value}</span>
  ),
};

// Creates Rechart LegendProps from a ChartConfiguration
export function KlimaLegendProps<T>(
  conf: ChartConfiguration<T>,
  extraProps: LegendProps = {}
): Omit<LegendProps, "ref"> {
  const props: LegendProps = {} as LegendProps;
  props.payload = [...conf]
    .sort((item1, item2) =>
      item1.legendOrder && item2.legendOrder
        ? item1.legendOrder > item2.legendOrder
          ? 1
          : -1
        : 0
    )
    .map((item) => {
      return {
        id: item.id,
        value: item.label,
        color: item.color,
        type: "circle",
      };
    });
  return Object.assign({}, BASE_LEGEND_PROPS, props, extraProps);
}
