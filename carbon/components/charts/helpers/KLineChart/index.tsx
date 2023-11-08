"use client"; // use client for recharts animations
import { KlimaLegendProps, KlimaLines } from "components/charts/helpers";
import { Legend, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import ChartWrapper from "../ChartWrapper";
import {
  BOTTOM_LEFT_LEGEND_PROPS,
  ChartProps,
  getKlimaTooltipProps,
  getXAxisProps,
  getYAxisProps,
} from "../props";
import styles from "../styles.module.scss";

/** FIXME: Refactor to KlimaLineChart */
export default function KLineChart<T extends object>(props: ChartProps<T>) {
  const localLegendProps =
    props.LegendProps ||
    Object.assign(
      {},
      KlimaLegendProps(props.configuration),
      BOTTOM_LEFT_LEGEND_PROPS
    );

  return (
    <ChartWrapper
      data={props.data}
      noDataText={props.noDataText}
      className={styles.mobileCenteredLegend}
    >
      <LineChart data={props.data}>
        <XAxis {...getXAxisProps(props)} />
        <YAxis {...getYAxisProps(props)} />
        <Tooltip {...getKlimaTooltipProps(props)} />
        <Legend {...localLegendProps} />
        {KlimaLines(props.configuration)}
      </LineChart>
    </ChartWrapper>
  );
}
