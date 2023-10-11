import {
  KlimaTooltip,
  KlimaXAxisDailyProps,
  KlimaXAxisMonthlyProps,
} from "components/charts/helpers";
import helpers from "lib/charts/helpers";
import {
  Bridge,
  ChartData,
  DateFilteringOption,
  Pool,
  Status,
} from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import { LegendProps, XAxisProps } from "recharts";
import { ChartConfiguration } from "./Configuration";
import {
  KlimaXAxisMethodologyProps,
  KlimaXAxisVintageProps,
  KlimaYAxisIdentityProps,
  KlimaYAxisPercentageAutoscaleProps,
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
  configuration: ChartConfiguration<keyof T>;
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
export type YAxisType =
  | "tons"
  | "price"
  | "percentage"
  | "percentageAutoscale"
  | "identity"
  | undefined;

export function getXAxisProps<T extends object>(props: ChartProps<T>) {
  const locale = currentLocale();
  // Default format months
  let XAxisProps: XAxisProps = KlimaXAxisMonthlyProps<T>(
    props.data,
    props.dateField
  );
  if (props.XAxis == "days") {
    XAxisProps = KlimaXAxisDailyProps<T>(props.data, props.dateField);
  }

  if (props.XAxis == "months") {
    XAxisProps = KlimaXAxisMonthlyProps<T>(props.data, props.dateField);
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
  // Default format tons
  let YAxisProps = KlimaYAxisTonsProps(props.data, props.configuration);
  if (props.YAxis == "price") {
    YAxisProps = KlimaYAxisPriceProps();
  }
  if (props.YAxis == "percentage") {
    YAxisProps = KlimaYAxisPercentageProps();
  }
  if (props.YAxis == "percentageAutoscale") {
    YAxisProps = KlimaYAxisPercentageAutoscaleProps();
  }
  if (props.YAxis == "identity") {
    YAxisProps = KlimaYAxisIdentityProps();
  }
  return YAxisProps;
}
export function getToolTipXAxisFormatter(XAxis: XAxisType) {
  const locale = currentLocale();
  // Default format months
  let toolTipXAxisFormatter = helpers.formatDateAsMonths;
  if (XAxis == "days") {
    toolTipXAxisFormatter = helpers.formatDateAsDays;
  }

  if (XAxis == "months") {
    toolTipXAxisFormatter = helpers.formatDateAsMonths;
  }

  if (XAxis == "vintage") {
    toolTipXAxisFormatter = (x: number) => String(x);
  }
  if (XAxis == "methodology") {
    toolTipXAxisFormatter = (x: number) => String(x);
  }
  return toolTipXAxisFormatter;
}
export function getToolTipYAxisFormatter(YAxis: YAxisType) {
  const locale = currentLocale();
  // Default format tons
  let toolTipYAxisFormatter = (x: number) =>
    helpers.formatTonnes({ amount: x, maximumFractionDigits: 2 });
  if (YAxis == "price") {
    toolTipYAxisFormatter = helpers.formatPrice;
  }
  if (YAxis == "percentage" || YAxis == "percentageAutoscale") {
    toolTipYAxisFormatter = (x) =>
      helpers.formatPercentage({ value: x, fractionDigits: 2 });
  }

  return toolTipYAxisFormatter;
}

export function getKlimaTooltipProps<T extends object>(props: ChartProps<T>) {
  return {
    content: KlimaTooltip({
      xAxisFormatter: getToolTipXAxisFormatter(props.XAxis),
      yAxisFormatter: getToolTipYAxisFormatter(props.YAxis),
    }),
    cursor: { fill: "transparent" },
  };
}

export const BOTTOM_LEFT_LEGEND_PROPS = {
  layout: "horizontal",
  verticalAlign: "bottom",
  align: "left",
  wrapperStyle: { marginLeft: "0.4rem", paddingTop: "0.2rem" },
};
