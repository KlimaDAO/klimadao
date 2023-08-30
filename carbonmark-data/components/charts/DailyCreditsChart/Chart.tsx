"use client"; // use client for recharts animations
import { DailyCreditsChartConfiguration } from "lib/charts/aggregators/getDailyCredits";
import helpers from "lib/charts/helpers";
import { DailyCreditsChartData } from "lib/charts/types";
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

interface Props {
  data: DailyCreditsChartData;
  configuration: DailyCreditsChartConfiguration;
}
export default function Chart(props: Props) {
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
          wrapperStyle={{ marginLeft: "40px", paddingTop: "20px" }}
        />
        {KlimaStackedAreas(props.configuration)}
      </AreaChart>
    </ResponsiveContainer>
  );
}
