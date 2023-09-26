"use client"; // use client for recharts animations
import { KlimaLegendProps, KlimaStackedBars } from "components/charts/helpers";
import {
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import NoDataChartWrapper from "../NoDataChartWrapper";
import {
  ChartProps,
  getKlimaTooltipProps,
  getXAxisProps,
  getYAxisProps,
} from "../props";

/** FIXME: Refactor to KlimaBarChart */
export default function KBarChart<T extends object>(props: ChartProps<T>) {
  const LocalLegendProps =
    props.LegendProps ||
    Object.assign({}, KlimaLegendProps(props.configuration), {
      layout: "horizontal",
      verticalAlign: "bottom",
      align: "left",
      wrapperStyle: { marginLeft: "40px", paddingTop: "20px" },
    });
  return (
    <NoDataChartWrapper data={props.data} noDataText={props.noDataText}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={props.data} barCategoryGap={"5%"}>
          {props.XAxis && <XAxis {...getXAxisProps(props)} />}
          {props.YAxis && <YAxis {...getYAxisProps(props)} />}
          <Tooltip {...getKlimaTooltipProps(props)} />
          <Legend {...LocalLegendProps} />
          {KlimaStackedBars(props.configuration)}
        </BarChart>
      </ResponsiveContainer>
    </NoDataChartWrapper>
  );
}
