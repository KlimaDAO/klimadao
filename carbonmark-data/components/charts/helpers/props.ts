import {
  KlimaTooltip,
  KlimaXAxisDailyProps,
  KlimaXAxisMonthlyProps,
} from "components/charts/helpers";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import helpers from "lib/charts/helpers";
import {
  Bridge,
  ChartData,
  DateFilteringOption,
  Pool,
  Status,
} from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import { LegendProps } from "recharts";
import {
  KlimaXAxisMethodologyProps,
  KlimaXAxisVintageProps,
  KlimaYAxisPercentageProps,
  KlimaYAxisPriceProps,
  KlimaYAxisTonsProps,
} from "./KlimaAxis";

export interface CreditsFilteringProps {
  bridge: Bridge;
  pool: Pool;
  status: Status;
  since: DateFilteringOption;
}

export interface ChartProps<T extends object> {
  data: ChartData<T>;
  configuration: SimpleChartConfiguration<T>;
  dateField: keyof T;
  XAxis?: XAxisType;
  YAxis?: YAxisType;
  LegendProps?: Omit<LegendProps, "ref">;
  noDataText?: string;
}

export type XAxisType =
  | "days"
  | "months"
  | "vintage"
  | "methodology"
  | undefined;
export type YAxisType = "tons" | "price" | "percentage" | undefined;

export function getXAxisProps<T extends object>(props: ChartProps<T>) {
  const locale = currentLocale();
  // Default format months
  let XAxisProps = KlimaXAxisMonthlyProps<T>(
    props.data,
    props.dateField,
    locale
  );
  if (props.XAxis == "days") {
    XAxisProps = KlimaXAxisDailyProps<T>(props.data, props.dateField, locale);
  }

  if (props.XAxis == "months") {
    XAxisProps = KlimaXAxisMonthlyProps<T>(props.data, props.dateField, locale);
  }

  if (props.XAxis == "vintage") {
    XAxisProps = KlimaXAxisVintageProps<T>(props.data, props.dateField);
  }
  if (props.XAxis == "methodology") {
    XAxisProps = KlimaXAxisMethodologyProps<T>(props.data, props.dateField);
  }

  return XAxisProps;
}
export function getYAxisProps<T extends object>(props: ChartProps<T>) {
  const locale = currentLocale();
  // Default format tons
  let YAxisProps = KlimaYAxisTonsProps(props.data, props.configuration);
  if (props.YAxis == "price") {
    YAxisProps = KlimaYAxisPriceProps();
  }
  if (props.YAxis == "percentage") {
    YAxisProps = KlimaYAxisPercentageProps();
  }
  return YAxisProps;
}
export function getToolTipXAxisFormatter<T extends object>(
  props: ChartProps<T>
) {
  const locale = currentLocale();
  // Default format months
  let toolTipXAxisFormatter = helpers.formatDateAsMonths(locale);
  if (props.XAxis == "days") {
    toolTipXAxisFormatter = helpers.formatDateAsDays(locale);
  }

  if (props.XAxis == "months") {
    toolTipXAxisFormatter = helpers.formatDateAsMonths(locale);
  }

  if (props.XAxis == "vintage") {
    toolTipXAxisFormatter = (x: number) => String(x);
  }
  if (props.XAxis == "methodology") {
    toolTipXAxisFormatter = (x: number) => String(x);
  }
  return toolTipXAxisFormatter;
}
export function getToolTipYAxisFormatter<T extends object>(
  props: ChartProps<T>
) {
  const locale = currentLocale();
  // Default format tons
  let toolTipYAxisFormatter = (x: number) =>
    helpers.formatTonnes({ amount: x, maximumFractionDigits: 2 });
  if (props.YAxis == "price") {
    toolTipYAxisFormatter = helpers.formatPrice(locale);
  }
  if (props.YAxis == "percentage") {
    toolTipYAxisFormatter = (x) =>
      helpers.formatPercentage({ value: x, fractionDigits: 2 });
  }

  return toolTipYAxisFormatter;
}

export function getKlimaTooltipProps<T extends object>(props: ChartProps<T>) {
  return {
    content: KlimaTooltip(
      getToolTipXAxisFormatter(props),
      getToolTipYAxisFormatter(props)
    ),
    cursor: { fill: "transparent" },
  };
}
