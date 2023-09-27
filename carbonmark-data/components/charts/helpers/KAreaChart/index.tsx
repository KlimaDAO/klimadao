"use client"; // use client for recharts animations
import { KlimaLegendProps, KlimaStackedAreas } from "components/charts/helpers";
import { AreaChart, Legend, Tooltip, XAxis, YAxis } from "recharts";
import ChartWrapper from "../ChartWrapper";
import {
  ChartProps,
  getKlimaTooltipProps,
  getXAxisProps,
  getYAxisProps,
} from "../props";

/** FIXME: Refactor to KlimaAreaChart */
export default function KAreaChart<T extends object>(props: ChartProps<T>) {
  const LocalLegendProps =
    props.LegendProps ||
    Object.assign({}, KlimaLegendProps(props.configuration), {
      layout: "horizontal",
      verticalAlign: "bottom",
      align: "left",
      wrapperStyle: { marginLeft: "40px", paddingTop: "20px" },
    });

  return (
    <ChartWrapper data={props.data} noDataText={props.noDataText}>
      <AreaChart data={props.data}>
        <XAxis {...getXAxisProps(props)} />
        <YAxis {...getYAxisProps(props)} />
        <Tooltip {...getKlimaTooltipProps(props)} />
        <Legend {...LocalLegendProps} />
        {KlimaStackedAreas(props.configuration)}
      </AreaChart>
    </ChartWrapper>
  );
}
