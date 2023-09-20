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
import { ChartData } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import {
  BarChart,
  Legend,
  LegendProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
} from "recharts";

interface Props<T extends object> {
  data: ChartData<T>;
  configuration: SimpleChartConfiguration<T>;
  dateField: keyof T;
  XAxisProps?: XAxisProps;
  YAxisProps?: YAxisProps;
  TooltipXAxis?: string;
  TooltipYAxis?: string;
  LegendProps?: Omit<LegendProps, "ref">;
}
/** FIXME: Refactor to KlimaBarChart */
export default function KBarChart<T extends object>(props: Props<T>) {
  const locale = currentLocale();
  const LocalXAxisProps =
    props.XAxisProps ||
    KlimaXAxisMonthlyProps<T>(props.data, props.dateField, locale);
  const LocalYAxisProps =
    props.YAxisProps || KlimaYAxisTonsProps(props.data, props.configuration);
  const LocalLegendProps =
    props.LegendProps ||
    Object.assign({}, KlimaLegendProps(props.configuration), {
      layout: "horizontal",
      verticalAlign: "bottom",
      align: "left",
      wrapperStyle: { marginLeft: "40px", paddingTop: "20px" },
    });
  const toolTipXAxisFormatter =
    props.TooltipXAxis == "days"
      ? helpers.formatDateAsDays(locale)
      : props.TooltipXAxis == "months"
      ? helpers.formatDateAsMonths(locale)
      : (x: number) => String(x);
  const toolTipYAxisFormatter =
    props.TooltipXAxis == "tons"
      ? (x: number) =>
          helpers.formatTonnes({ amount: x, maximumFractionDigits: 2 })
      : (x: number) =>
          helpers.formatTonnes({ amount: x, maximumFractionDigits: 2 });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={props.data} barCategoryGap={"5%"}>
        <XAxis {...LocalXAxisProps} />
        <YAxis {...LocalYAxisProps} />
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
