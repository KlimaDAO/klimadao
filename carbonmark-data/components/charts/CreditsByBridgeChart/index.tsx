import { getAggregatedCredits } from "lib/charts/aggregators/getAggregatedCredits";
import { AggregatedCreditsChartQueryParams, Bridge } from "lib/charts/types";
import { ChartConfiguration } from "../helpers/Configuration";
import Chart from "./Chart";

/** Async server component that renders a Recharts client component */
export default async function dailyCreditsChart(props: {
  queries: Array<AggregatedCreditsChartQueryParams>;
  configuration: ChartConfiguration<Bridge>;
}) {
  const data = await getAggregatedCredits(props.queries);
  return <Chart data={data} configuration={props.configuration} />;
}
