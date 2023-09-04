import { helpers } from "lib/charts";
import { ChartData } from "lib/charts/types";
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
});
/* Base parameters for YAxis */
const BASE_YAXIS_PROPS = Object.assign({}, BASE_AXIS_PROPS, {
  dx: -10,
  axisLine: true,
});

/* XAxis props to display ticks as months */
export function KlimaXAxisMonthlyProps<T>(
  data: ChartData<T>,
  dataKey: keyof T,
  locale: string
) {
  return Object.assign({}, BASE_XAXIS_PROPS, {
    dataKey: "date",
    tickFormatter: helpers.formatDateAsMonths(locale),
    ticks: helpers.niceTicks(data, dataKey),
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
export function KlimaYAxisPriceProps(locale: string) {
  const tickFormatter = helpers.formatPrice(locale);
  return Object.assign({}, BASE_YAXIS_PROPS, { tickFormatter });
}
