"use client"; // use client for recharts animations
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import helpers from "lib/charts/helpers";
import { CarbonMetricsItem, ChartData } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import {
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  KlimaLegendProps,
  KlimaStackedBars,
  KlimaTooltip,
  KlimaXAxisMonthlyProps,
  KlimaYAxisPercentageProps,
} from "../helpers";

interface Props {
  data: ChartData<CarbonMetricsItem>;
  configuration: SimpleChartConfiguration<CarbonMetricsItem>;
}
export default function Chart(props: Props) {
  const locale = currentLocale();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={props.data} barCategoryGap={"5%"}>
        <XAxis {...KlimaXAxisMonthlyProps(props.data, "date", locale)} />
        <YAxis {...KlimaYAxisPercentageProps()} />
        <Tooltip
          content={KlimaTooltip(helpers.formatDateAsDays(locale), (x) =>
            helpers.formatPercentage({ value: x, fractionDigits: 0 })
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
        {KlimaStackedBars(props.configuration)}
      </BarChart>
    </ResponsiveContainer>
  );
}
