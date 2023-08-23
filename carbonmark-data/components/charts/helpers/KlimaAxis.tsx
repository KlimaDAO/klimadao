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
  dataKey: keyof T
) {
  return Object.assign({}, BASE_XAXIS_PROPS, {
    dataKey: "date",
    tickFormatter: helpers.formatDateAsMonths,
    ticks: helpers.niceTicks(data, dataKey),
  });
}

/* YAxis props to display quantity in an appropriate format */
export function KlimaYAxisTonsProps<T>(
  data: ChartData<T>,
  conf: ChartConfiguration<T>
) {
  // Find maximum value in data
  const dataKeys: Array<keyof T> = conf.map(
    (confItem) => confItem.id as keyof T
  );
  const max = helpers.getDataChartMax(data, dataKeys);
  console.log(max);
  // Select formatter
  const tickFormatter =
    max < 1000
      ? helpers.formatQuantityAsTons
      : max < 1000000
      ? helpers.formatQuantityAsKiloTons
      : helpers.formatQuantityAsMillionsOfTons;

  return Object.assign({}, BASE_YAXIS_PROPS, { tickFormatter });
}
