"use client"; // use client for recharts animations
import {
  KlimaLegendProps,
  KlimaStackedBars,
  KlimaTooltip,
  KlimaXAxisMonthlyProps,
  KlimaYAxisTonsProps,
} from "components/charts/helpers";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import helpers from "lib/charts/helpers";
import {
  ChartData,
  DateField,
  MonthlyAggregatedCreditsByPoolItem,
} from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import {
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: ChartData<MonthlyAggregatedCreditsByPoolItem>;
  configuration: SimpleChartConfiguration<MonthlyAggregatedCreditsByPoolItem>;
  dateField: DateField;
}
export default function Chart(props: Props) {
  const locale = currentLocale();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={props.data} barCategoryGap={"5%"}>
        <XAxis
          {...KlimaXAxisMonthlyProps(props.data, props.dateField, locale)}
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
        {KlimaStackedBars(props.configuration)}
      </BarChart>
    </ResponsiveContainer>
  );
}
