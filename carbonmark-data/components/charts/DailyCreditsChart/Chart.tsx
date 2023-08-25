"use client"; // use client for recharts animations
import helpers from "lib/charts/helpers";
import {
  DailyCreditsChartData,
  DailyCreditsChartDataItem,
} from "lib/charts/types";
import {
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  KlimaLegendProps,
  KlimaStackedAreas,
  KlimaTooltip,
  KlimaXAxisMonthlyProps,
  KlimaYAxisTonsProps,
} from "../helpers";
import { ChartConfiguration } from "../helpers/Configuration";

interface Props {
  data: DailyCreditsChartData;
  configuration: ChartConfiguration<DailyCreditsChartDataItem>;
}
export default function Chart(props: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={props.data}>
        <XAxis {...KlimaXAxisMonthlyProps(props.data, "date")} />
        <YAxis {...KlimaYAxisTonsProps(props.data, props.configuration)} />
        <Tooltip
          content={KlimaTooltip(
            helpers.formatDateAsDays,
            helpers.formatQuantityAsTons
          )}
          cursor={{ fill: "transparent" }}
        />
        <Legend {...KlimaLegendProps(props.configuration)} />
        {KlimaStackedAreas(props.configuration)}
      </AreaChart>
    </ResponsiveContainer>
  );
}
