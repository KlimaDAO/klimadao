"use client"; // use client for recharts animations
import { KlimaLegendProps, KlimaLines } from "components/charts/helpers";
import {
  Legend,
  LineChart,
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
export default function KLineChart<T extends object>(props: ChartProps<T>) {
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
        <LineChart data={props.data}>
          <XAxis {...getXAxisProps(props)} />
          <YAxis {...getYAxisProps(props)} />
          <Tooltip {...getKlimaTooltipProps(props)} />
          <Legend {...LocalLegendProps} />
          {KlimaLines(props.configuration)}
        </LineChart>
      </ResponsiveContainer>
    </NoDataChartWrapper>
  );
}
