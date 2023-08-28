import { getAggregatedCredits } from "lib/charts/aggregators/getAggregatedCredits";
import Chart from "./Chart";

import { AggregatedCreditsChartConfiguration } from "lib/charts/aggregators/getAggregatedCredits";

/** Async server component that renders a Recharts client component */
export default async function dailyCreditsChart(props: {
  configuration: AggregatedCreditsChartConfiguration;
}) {
  const data = await getAggregatedCredits(props.configuration);
  return <Chart data={data} configuration={props.configuration} />;
}
