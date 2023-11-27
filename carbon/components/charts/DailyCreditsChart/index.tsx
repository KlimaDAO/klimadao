import { getMergedCreditsByDate } from "lib/charts/aggregators/getDailyCredits";
import { cumulativeSum } from "lib/charts/helpers";
import {
  DailyCreditsChartConfiguration,
  DailyCreditsChartDataItem,
  DailyCreditsQueryConfiguration,
} from "lib/charts/types";
import { ChartConfiguration } from "../helpers/Configuration";
import KAreaChart from "../helpers/KAreaChart";

/** Async server component that renders a Recharts client component */
export default async function DailyCreditsChart(props: {
  chartConfiguration: DailyCreditsChartConfiguration;
  queryConfiguration: DailyCreditsQueryConfiguration;
}) {
  const chartConfiguration = props.chartConfiguration as ChartConfiguration<
    keyof DailyCreditsChartDataItem
  >;
  const data = cumulativeSum(
    await getMergedCreditsByDate("daily", props.queryConfiguration),
    chartConfiguration
  );
  //const data = await getDailyCredits(props.queryConfiguration);
  return (
    <KAreaChart
      data={data}
      configuration={chartConfiguration}
      dateField="date"
    />
  );
}
