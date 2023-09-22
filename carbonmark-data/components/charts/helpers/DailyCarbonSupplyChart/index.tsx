import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { getCarbonMetrics } from "lib/charts/aggregators/getCarbonMetrics";
import { CarbonMetricsItem } from "lib/charts/types";
import Chart from "./Chart";

/** Generic Daily Carbon Supply Chart */
export async function DailyCarbonSupplyChart(props: {
  configuration: SimpleChartConfiguration<CarbonMetricsItem>;
}) {
  const data = await getCarbonMetrics(props.configuration);
  return <Chart data={data} configuration={props.configuration} />;
}
