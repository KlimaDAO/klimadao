import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { getTokenCarbonMetricsInPercent } from "lib/charts/aggregators/getCarbonMetrics";
import { DailyCarbonMetricsItem } from "lib/charts/types";
import Chart from "./Chart";

/** Async server component that renders a Recharts client component */
export default async function KlimaDAORetirementsByTokenBarChart(props: {
  configuration: SimpleChartConfiguration<DailyCarbonMetricsItem>;
}) {
  console.log("a")
  const data = await getTokenCarbonMetricsInPercent(props.configuration);
  return <Chart configuration={props.configuration} data={data} />;
  return <></>
}
