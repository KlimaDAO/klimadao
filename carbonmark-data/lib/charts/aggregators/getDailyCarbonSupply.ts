import { queryDailyCarbonMetrics } from "lib/charts/queries";
import {
  DailyCeloCarbonMetricsItem,
  DailyEthCarbonMetricsItem,
  DailyPolygonCarbonMetricsItem,
} from "lib/charts/types";

const params = {
  sort_by: "date",
  sort_order: "asc",
  page_size: -1,
};

/* Fetches Polygon daily carbon supply  */
export async function getPolygonDailyCarbonMetrics() {
  return (
    await queryDailyCarbonMetrics<DailyPolygonCarbonMetricsItem>(
      "polygon",
      params
    )
  ).items;
}

/* Fetches Eth daily carbon supply  */
export async function getEthDailyCarbonMetrics() {
  return (
    await queryDailyCarbonMetrics<DailyEthCarbonMetricsItem>("eth", params)
  ).items;
}

/* Fetches Celo daily carbon supply  */
export async function getCeloDailyCarbonMetrics() {
  return (
    await queryDailyCarbonMetrics<DailyCeloCarbonMetricsItem>("celo", params)
  ).items;
}
