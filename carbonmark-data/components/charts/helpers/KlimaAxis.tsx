import { helpers } from "lib/charts";
import { ChartData } from "lib/charts/types";

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

/* YAxis props to display quantity in million of tons */
export function KlimaYAxisMillionsOfTonsProps() {
  return Object.assign({}, BASE_YAXIS_PROPS, {
    tickFormatter: helpers.formatQuantityAsMillionsOfTons,
  });
}
