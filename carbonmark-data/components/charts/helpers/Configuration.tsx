export interface ChartConfigurationItem<T> {
  id: Extract<T, string>; // id of chart, also the key used by recharts to find data for this configuration item
  label: string; // label
  color: string; // color on the chart
  legendOrder?: number; // The order in which the element are displayd in the legend
}
/*
A chart configuration is an array of configuration items that also bear data about how to query data (Q)
*/
export type ChartConfiguration<Q, M, C> = Array<{
  query: Q;
  dataMapping?: M;
  chartOptions: ChartConfigurationItem<C>;
}>;
