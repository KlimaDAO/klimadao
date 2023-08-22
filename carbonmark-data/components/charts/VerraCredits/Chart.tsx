"use client"; // use client for recharts animations
import helpers from "lib/charts/helpers";
import { VerraCreditsChartData } from "lib/charts/types";
import {
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  KlimaLegendProps,
  KlimaStackedAreas,
  KlimaTooltip,
  KlimaXAxisMonthlyProps,
  KlimaYAxisMillionsOfTonsProps
} from "../helpers";
import { ChartConfiguration } from "../helpers/Configuration";

interface Props {
  data: VerraCreditsChartData;
  configuration: ChartConfiguration
}
export default function Chart(props: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={props.data}>
        <XAxis {...KlimaXAxisMonthlyProps(props.data, "date")} />
        <YAxis {...KlimaYAxisMillionsOfTonsProps()} />
        <Tooltip
          content={KlimaTooltip(
            helpers.formatDateAsDays,
            helpers.formatQuantityAsTons,
          )}
          cursor={{ fill: "transparent" }}
        />
        <Legend {...KlimaLegendProps(props.configuration)} />
        {KlimaStackedAreas(props.configuration)}
      </AreaChart>
    </ResponsiveContainer>
  );
}
