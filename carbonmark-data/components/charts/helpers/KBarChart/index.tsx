"use client"; // use client for recharts animations
import {
  KlimaLegendProps,
  KlimaTooltip,
  KlimaXAxisMonthlyProps,
  KlimaYAxisTonsProps,
} from "components/charts/helpers";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import helpers from "lib/charts/helpers";
import { ChartData } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import { ReactNode } from "react";
import {
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props<T extends object> {
  data: ChartData<T>;
  configuration: SimpleChartConfiguration<T>;
  dateField: keyof T;
  XAxis?: ReactNode;
  YAxis?: ReactNode;
  Tooltip?: ReactNode;
  Legend?: ReactNode;
}
/** FIXME: Refactor to KlimaBarChart */
export default function KBarChart<T extends object>(props: Props<T>) {
  const locale = currentLocale();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={props.data} barCategoryGap={"5%"}>
      <XAxis
      {...KlimaXAxisMonthlyProps<T>(props.data, props.dateField, locale)}
    />
        <YAxis {...KlimaYAxisTonsProps(props.data, props.configuration)} />
        <Tooltip
      content={KlimaTooltip(helpers.formatDateAsDays(locale), (x) =>
        helpers.formatTonnes({ amount: x, maximumFractionDigits: 2 })
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
      </BarChart>
    </ResponsiveContainer>
  );
}
