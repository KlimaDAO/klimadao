"use client"; // use client for recharts animations
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import helpers from "lib/charts/helpers";
import { ChartData } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import {
  AreaChart,
  Legend,
  LegendProps,
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
} from "../../helpers";

interface Props<T extends object> {
  data: ChartData<T>;
  configuration: SimpleChartConfiguration<T>;
  dateField: keyof T;
  XAxis?: string;
  YAxis?: string;
  LegendProps?: Omit<LegendProps, "ref">;
  noDataText?: string;
}
/** FIXME: Refactor to KlimaBarChart */
export default function KStackedLines<T extends object>(props: Props<T>) {
  const locale = currentLocale();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={props.data}>
        <XAxis
          {...KlimaXAxisMonthlyProps(props.data, props.dateField, locale)}
        />
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
