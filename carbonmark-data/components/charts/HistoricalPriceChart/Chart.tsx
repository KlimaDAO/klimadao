"use client"; // use client for recharts animations
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import helpers from "lib/charts/helpers";
import { ChartData, PricesItem } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import {
  Legend,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  KlimaLegendProps,
  KlimaTooltip,
  KlimaXAxisMonthlyProps,
  KlimaYAxisPriceProps,
} from "../helpers";
import { KlimaLines } from "../helpers/KlimaLineChart";

interface Props {
  data: ChartData<PricesItem>;
  configuration: SimpleChartConfiguration;
}
export default function Chart(props: Props) {
  const locale = currentLocale();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={props.data}>
        <XAxis {...KlimaXAxisMonthlyProps(props.data, "date", locale)} />
        <YAxis {...KlimaYAxisPriceProps(locale)} />
        <Tooltip
          content={KlimaTooltip(
            helpers.formatDateAsDays(locale),
            helpers.formatPrice(locale)
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
        {KlimaLines(props.configuration)}
      </LineChart>
    </ResponsiveContainer>
  );
}
