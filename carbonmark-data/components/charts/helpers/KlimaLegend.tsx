import { LegendProps } from "recharts";
import { ChartConfiguration } from "./Configuration";
import styles from "./styles.module.scss";

const BASE_LEGEND_PROPS = {
  formatter: (value: string) => (
    <span className={styles.chartLegendText}>{value}</span>
  ),
};

// Creates Rechart LegendProps from a ChartConfiguration
export function KlimaLegendProps<Q, M, T>(
  conf: ChartConfiguration<Q, M, T>,
  extraProps: LegendProps = {}
): Omit<LegendProps, "ref"> {
  const props: LegendProps = {} as LegendProps;
  props.payload = [...conf]
    .sort((item1, item2) =>
      item1.chartOptions.legendOrder && item2.chartOptions.legendOrder
        ? item1.chartOptions.legendOrder > item2.chartOptions.legendOrder
          ? 1
          : -1
        : 0
    )
    .map((item) => {
      return {
        id: item.chartOptions.id,
        value: item.chartOptions.label,
        color: item.chartOptions.color,
        type: "circle",
      };
    });
  return Object.assign({}, BASE_LEGEND_PROPS, props, extraProps);
}
