"use client"; // use client for recharts animations
import {
  KlimaLegendProps,
  KlimaStackedBars,
  KlimaTooltip,
  KlimaXAxisDailyProps,
  KlimaXAxisMonthlyProps,
  KlimaYAxisTonsProps,
} from "components/charts/helpers";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import helpers from "lib/charts/helpers";
import { ChartData } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import {
  BarChart,
  Legend,
  LegendProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  KlimaXAxisMethodologyProps,
  KlimaXAxisVintageProps,
} from "../KlimaAxis";

interface Props<T extends object> {
  data: ChartData<T>;
  configuration: SimpleChartConfiguration<T>;
  dateField: keyof T;
  XAxis?: string;
  YAxis?: string;
  LegendProps?: Omit<LegendProps, "ref">;
}
/** FIXME: Refactor to KlimaBarChart */
export default function KBarChart<T extends object>(props: Props<T>) {
  const locale = currentLocale();
  // Default configuration
  let XAxisProps = KlimaXAxisMonthlyProps<T>(
    props.data,
    props.dateField,
    locale
  );
  let YAxisProps = KlimaYAxisTonsProps(props.data, props.configuration);
  let toolTipXAxisFormatter = helpers.formatDateAsMonths(locale);
  let toolTipYAxisFormatter = (x: number) =>
    helpers.formatTonnes({ amount: x, maximumFractionDigits: 2 });

  if (props.XAxis == "days") {
    toolTipXAxisFormatter = helpers.formatDateAsDays(locale);
    XAxisProps = KlimaXAxisDailyProps<T>(props.data, props.dateField, locale);
  }

  if (props.XAxis == "months") {
    toolTipXAxisFormatter = helpers.formatDateAsMonths(locale);
    XAxisProps = KlimaXAxisMonthlyProps<T>(props.data, props.dateField, locale);
  }

  if (props.XAxis == "vintage") {
    toolTipXAxisFormatter = (x: number) => String(x);
    XAxisProps = KlimaXAxisVintageProps<T>(props.data, props.dateField);
  }
  if (props.XAxis == "methodology") {
    toolTipXAxisFormatter = (x: number) => String(x);
    XAxisProps = KlimaXAxisMethodologyProps<T>(props.data, props.dateField);
  }
  if (props.YAxis == "tons") {
    toolTipYAxisFormatter = (x: number) =>
      helpers.formatTonnes({ amount: x, maximumFractionDigits: 2 });
  }
  const LocalLegendProps =
    props.LegendProps ||
    Object.assign({}, KlimaLegendProps(props.configuration), {
      layout: "horizontal",
      verticalAlign: "bottom",
      align: "left",
      wrapperStyle: { marginLeft: "40px", paddingTop: "20px" },
    });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={props.data} barCategoryGap={"5%"}>
        <XAxis {...XAxisProps} />
        <YAxis {...YAxisProps} />
        <Tooltip
          content={KlimaTooltip(toolTipXAxisFormatter, toolTipYAxisFormatter)}
          cursor={{ fill: "transparent" }}
        />
        <Legend {...LocalLegendProps} />
        {KlimaStackedBars(props.configuration)}
      </BarChart>
    </ResponsiveContainer>
  );
}
