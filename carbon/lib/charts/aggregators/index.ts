import { ChartConfiguration } from "components/charts/helpers/Configuration";

export type SimpleChartConfigurationFromType<C> = ChartConfiguration<C>;

export type SimpleChartConfiguration<C> = SimpleChartConfigurationFromType<
  keyof C
>;
