import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { getTokenCarbonMetricsInPercent } from "lib/charts/aggregators/getCarbonMetrics";
import { CarbonMetricsItem } from "lib/charts/types";
import Chart from "./Chart";

/** Async server component that renders a Recharts client component */
export default async function KlimaDAORetirementsByChainBarChart(props: {
  configuration: SimpleChartConfiguration<CarbonMetricsItem>;
}) {
  const data = await getTokenCarbonMetricsInPercent(props.configuration);
  return <Chart configuration={props.configuration} data={data} />;
}
