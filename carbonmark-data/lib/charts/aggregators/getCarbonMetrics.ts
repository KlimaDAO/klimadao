import { queryCarbonMetrics } from "lib/charts/queries";
import { CarbonMetricsItem } from "lib/charts/types";
import { SimpleChartConfiguration } from ".";
import { pruneNullRows, transformToPercentages } from "../helpers";

/* Fetches daily carbon metrics  */
export async function getCarbonMetrics(
  configuration: SimpleChartConfiguration<CarbonMetricsItem>
) {
  const data = await queryCarbonMetrics<CarbonMetricsItem>("all", {
    sort_by: "date",
    sort_order: "asc",
    page_size: -1,
    sample: "monthly",
  });
  return pruneNullRows(data.items, configuration);
}

/* Fetches Polygon latest carbon metrics  */
export async function getLatestCarbonMetrics() {
  return (
    await queryCarbonMetrics<CarbonMetricsItem>("all", {
      sort_by: "date",
      sort_order: "desc",
      page_size: 1,
    })
  ).items[0];
}

export async function getTokenCarbonMetricsInPercent(
  configuration: SimpleChartConfiguration<CarbonMetricsItem>
) {
  const data = await getCarbonMetrics(configuration);
  return transformToPercentages(data, configuration);
}
