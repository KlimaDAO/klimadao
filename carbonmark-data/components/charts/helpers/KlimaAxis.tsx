import { helpers } from "lib/charts";
import { ChartData } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import { ChartConfiguration } from "./Configuration";
/* Base parameters for all Axis */
const BASE_AXIS_PROPS = {
  tickLine: false,
  tick: { fontSize: 12 },
};
/* Base parameters for XAxis */
const BASE_XAXIS_PROPS = Object.assign({}, BASE_AXIS_PROPS, {
  dy: 10,
  axisLine: false,
  interval: 0,
});
/* Base parameters for YAxis */
const BASE_YAXIS_PROPS = Object.assign({}, BASE_AXIS_PROPS, {
  dx: -10,
  axisLine: true,
});

/* XAxis props to display ticks as months */
export function KlimaXAxisMonthlyProps<T>(
  data: ChartData<T>,
  dataKey: keyof T
) {
  return Object.assign({}, BASE_XAXIS_PROPS, {
    // FIXME: We should not need to hard cast here
    dataKey: dataKey as string,
    tickFormatter: helpers.formatDateAsMonths,
    ticks: helpers.niceTicks(data, dataKey),
  });
}
/* XAxis props to display ticks as days */
export function KlimaXAxisDailyProps<T>(data: ChartData<T>, dataKey: keyof T) {
  return Object.assign({}, BASE_XAXIS_PROPS, {
    // FIXME: We should not need to hard cast here
    dataKey: dataKey as string,
    tickFormatter: helpers.formatDateAsDays,
    ticks: helpers.niceTicks(data, dataKey),
  });
}
/* XAxis props to display vintage dates */
export function KlimaXAxisVintageProps<T>(
  data: ChartData<T>,
  dataKey: keyof T
) {
  return Object.assign({}, BASE_XAXIS_PROPS, {
    // FIXME: We should not need to hard cast here
    dataKey: dataKey as string,
    ticks: helpers.niceTicks(data, dataKey),
    tickFormatter: (x: number) => String(x),
  });
}

/* XAxis props to display methodologies */
export function KlimaXAxisMethodologyProps<T>(
  data: ChartData<T>,
  dataKey: keyof T
) {
  return Object.assign({}, BASE_XAXIS_PROPS, {
    // FIXME: We should not need to hard cast here
    dataKey: dataKey as string,
    tickFormatter: (x: number) => String(x),
    ticks: [],
    tick: { fontSize: 8 },
    angle: -22,
  });
}

/* YAxis props to display quantity in an appropriate format */
export function KlimaYAxisTonsProps<CI, Q, M, T>(
  data: ChartData<CI>,
  conf: ChartConfiguration<Q, M, T>
) {
  // Find maximum value in data
  const dataKeys: Array<keyof CI> = conf.map(
    (confItem) => confItem.chartOptions.id as keyof CI
  );
  const max = helpers.getDataChartMax(data, dataKeys);
  // Select formatter
  const tickFormatter =
    max < 10 ** 4
      ? helpers.formatQuantityAsTons
      : max < 10 ** 7
      ? helpers.formatQuantityAsKiloTons
      : helpers.formatQuantityAsMillionsOfTons;

  return Object.assign({}, BASE_YAXIS_PROPS, { tickFormatter });
}

/* YAxis props to display prices in an appropriate format */
export function KlimaYAxisPriceProps() {
  const locale = currentLocale();
  const formatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  });
  const tickFormatter = (value: number) => formatter.format(value);
  return Object.assign({}, BASE_YAXIS_PROPS, { tickFormatter });
}

/* YAxis props to display percentages in an appropriate format */
export function KlimaYAxisPercentageProps() {
  const tickFormatter = (x: number) =>
    helpers.formatPercentage({ value: x, fractionDigits: 0 });
  return Object.assign(
    {
      domain: [0, 1],
      ticks: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
    BASE_YAXIS_PROPS,
    { tickFormatter }
  );
}
