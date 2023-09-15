"use client"; // use client for recharts animations
import { SimpleChartConfigurationFromType } from "lib/charts/aggregators";
import helpers from "lib/charts/helpers";
import { CarbonMetricsItem, ChartData } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
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

export type ChartKey = "total_klima_retirements" | "not_klima_retired";

interface Props<ChartKey> {
  data: ChartData<CarbonMetricsItem>;
  configuration: SimpleChartConfigurationFromType<ChartKey>;
}
export default function Chart<T>(props: Props<T>) {
  const locale = currentLocale();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={props.data}>
        <XAxis {...KlimaXAxisMonthlyProps(props.data, "date", locale)} />
        <YAxis {...KlimaYAxisTonsProps(props.data, props.configuration)} />
        <Tooltip
          content={KlimaTooltip(
            helpers.formatDateAsDays(locale),
            helpers.formatQuantityAsTons
          )}
          cursor={{ fill: "transparent" }}
        />
        <Legend
          {...KlimaLegendProps(props.configuration)}
          layout="horizontal"
          verticalAlign="bottom"
          align="left"
          wrapperStyle={{ marginLeft: "4rem", paddingTop: "2rem" }}
        />
        {KlimaStackedAreas(props.configuration)}
      </AreaChart>
    </ResponsiveContainer>
  );
}