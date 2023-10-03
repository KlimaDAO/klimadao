"use client"; // use client for recharts animations
import { KlimaLegendProps, KlimaStackedBars } from "components/charts/helpers";
import { BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import ChartWrapper from "../ChartWrapper";
import {
  BOTTOM_LEFT_LEGEND_PROPS,
  ChartProps,
  getKlimaTooltipProps,
  getXAxisProps,
  getYAxisProps,
} from "../props";

/** FIXME: Refactor to KlimaBarChart */
export default function KBarChart<T extends object>(props: ChartProps<T>) {
  const localLegendProps =
    props.LegendProps ||
    Object.assign(
      {},
      KlimaLegendProps(props.configuration),
      BOTTOM_LEFT_LEGEND_PROPS
    );
  return (
    <ChartWrapper data={props.data} noDataText={props.noDataText}>
      <BarChart data={props.data} barCategoryGap={"5%"}>
        {props.XAxis && <XAxis {...getXAxisProps(props)} />}
        {props.YAxis && <YAxis {...getYAxisProps(props)} />}
        <Tooltip {...getKlimaTooltipProps(props)} />
        <Legend {...localLegendProps} />
        {KlimaStackedBars(props.configuration)}
      </BarChart>
    </ChartWrapper>
  );
}
