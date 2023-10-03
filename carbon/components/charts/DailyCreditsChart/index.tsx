import {
  DailyCreditsChartConfiguration,
  DailyCreditsQueryConfiguration,
  getDailyCredits,
} from "lib/charts/aggregators/getDailyCredits";
import { DailyCreditsChartDataItem } from "lib/charts/types";
import { ChartConfiguration } from "../helpers/Configuration";
import KAreaChart from "../helpers/KAreaChart";

/** Async server component that renders a Recharts client component */
export default async function DailyCreditsChart(props: {
  chartConfiguration: DailyCreditsChartConfiguration;
  queryConfiguration: DailyCreditsQueryConfiguration;
}) {
  const configuration = props.chartConfiguration as ChartConfiguration<
    keyof DailyCreditsChartDataItem
  >;
  const data = await getDailyCredits(props.queryConfiguration);
  return (
    <KAreaChart data={data} configuration={configuration} dateField="date" />
  );
}
