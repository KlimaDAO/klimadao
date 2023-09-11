import { ChartConfiguration } from "components/charts/helpers/Configuration";

export type SimpleChartConfiguration<C> = ChartConfiguration<
  object,
  object,
  keyof C
>;
