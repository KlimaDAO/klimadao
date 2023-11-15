"use client"; // use client for recharts animations
import { KlimaLegendProps, KlimaStackedAreas } from "components/charts/helpers";
import { AreaChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import ChartWrapper from "../ChartWrapper";
import {
  BOTTOM_LEFT_LEGEND_PROPS,
  ChartProps,
  getKlimaTooltipProps,
  getXAxisProps,
  getYAxisProps,
} from "../props";
import styles from "../styles.module.scss";

/** FIXME: Refactor to KlimaAreaChart */
export default function KAreaChart<T extends object>(props: ChartProps<T>) {
  const showLegend = props.showLegend !== undefined ? props.showLegend : true;
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
      <AreaChart data={props.data}>
        {KlimaStackedAreas(props.configuration)}
        <XAxis {...getXAxisProps(props)} />
        <YAxis {...getYAxisProps(props)} />
        <Tooltip {...getKlimaTooltipProps(props)} />
        {showLegend && <Legend {...localLegendProps} />}
      </AreaChart>
    </ChartWrapper>
  );
}
