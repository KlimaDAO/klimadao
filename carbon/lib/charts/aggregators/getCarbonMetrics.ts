import { ChartConfiguration } from "components/charts/helpers/Configuration";
import { queryCarbonMetrics } from "lib/charts/queries";
import { CarbonMetricsItem } from "lib/charts/types";
import { pruneNullRows, transformToPercentages } from "../helpers";

/* Fetches daily carbon metrics  */
export async function getCarbonMetrics(
  configuration: ChartConfiguration<keyof CarbonMetricsItem>
) {
  const data = await queryCarbonMetrics<CarbonMetricsItem>("all", {
    sort_by: "date",
    sort_order: "asc",
    page_size: -1,
    sample: "monthly",
  });
  return pruneNullRows(data.items, configuration);
}

/* Fetches latest carbon metrics  */
export async function getLatestCarbonMetrics() {
  return (
    await queryCarbonMetrics<CarbonMetricsItem>("all", {
      sort_by: "date",
      sort_order: "desc",
      page_size: 1,
    })
  ).items[0];
}

/* Fetches carbon metrics from 7 days ago  */
export async function getCarbonMetrics7daysAgo() {
  return (
    await queryCarbonMetrics<CarbonMetricsItem>("all", {
      sort_by: "date",
      sort_order: "desc",
      page_size: 7,
    })
  ).items[6];
}

export async function getTokenCarbonMetricsInPercent(
  configuration: ChartConfiguration<keyof CarbonMetricsItem>
) {
  const data = await getCarbonMetrics(configuration);
  return transformToPercentages(data, configuration);
}
