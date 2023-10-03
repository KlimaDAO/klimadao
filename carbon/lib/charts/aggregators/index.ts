import { ChartConfiguration } from "components/charts/helpers/Configuration";

export type SimpleChartConfigurationFromType<C> = ChartConfiguration<
  object,
  object,
  C
>;

export type SimpleChartConfiguration<C> = SimpleChartConfigurationFromType<
  keyof C
>;
