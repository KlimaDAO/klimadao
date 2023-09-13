import { queryDailyCarbonMetrics } from "lib/charts/queries";
import {
  DailyCarbonMetricsItem,
  DailyCeloCarbonMetricsItem,
  DailyEthCarbonMetricsItem,
  DailyPolygonCarbonMetricsItem,
} from "lib/charts/types";
import { SimpleChartConfiguration } from ".";
import { monthlySample, transformToPercentages } from "../helpers";

const dailyParams = {
  sort_by: "date",
  sort_order: "asc",
  page_size: -1,
};

const latestParams = {
  sort_by: "date",
  sort_order: "desc",
  page_size: 1,
};

/* Fetches Polygon daily carbon metrics  */
export async function getPolygonDailyCarbonMetrics() {
  return (
    await queryDailyCarbonMetrics<DailyPolygonCarbonMetricsItem>(
      "polygon",
      dailyParams
    )
  ).items;
}

/* Fetches Eth daily carbon metrics  */
export async function getEthDailyCarbonMetrics() {
  return (
    await queryDailyCarbonMetrics<DailyEthCarbonMetricsItem>("eth", dailyParams)
  ).items;
}

/* Fetches Celo daily carbon metrics  */
export async function getCeloDailyCarbonMetrics() {
  return (
    await queryDailyCarbonMetrics<DailyCeloCarbonMetricsItem>(
      "celo",
      dailyParams
    )
  ).items;
}

/* Fetches Polygon latest carbon metrics  */
export async function getPolygonLatestCarbonMetrics() {
  return (
    await queryDailyCarbonMetrics<DailyPolygonCarbonMetricsItem>(
      "polygon",
      latestParams
    )
  ).items[0];
}

/* Fetches Eth latest carbon metrics  */
export async function getEthLatestCarbonMetrics() {
  return (
    await queryDailyCarbonMetrics<DailyEthCarbonMetricsItem>(
      "eth",
      latestParams
    )
  ).items[0];
}

/* Fetches Celo latest carbon metrics  */
export async function getCeloLatestCarbonMetrics() {
  return (
    await queryDailyCarbonMetrics<DailyCeloCarbonMetricsItem>(
      "celo",
      latestParams
    )
  ).items[0];
}

/* Fetches All carbon metrics  */
export async function getDailyCarbonMetrics() {
  return (
    await queryDailyCarbonMetrics<DailyCarbonMetricsItem>(
      "all",
      dailyParams
    )
  ).items;
}

export async function getTokenCarbonMetricsInPercent(configuration: SimpleChartConfiguration<DailyCarbonMetricsItem>) {
  const data = await getDailyCarbonMetrics()
  return transformToPercentages(monthlySample(data, "date"), configuration);
}