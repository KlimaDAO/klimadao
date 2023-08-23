interface ChartConfigurationItem<T> {
  id: Extract<keyof T, string>; // id of chart, also the key used to find data for this configuration item
  label: string; // label
  color: string; // color on the chart
  legendOrder?: number; // The order in which the element are displayd in the legend
}
export type ChartConfiguration<T> = Array<ChartConfigurationItem<T>>;
