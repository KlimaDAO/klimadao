import { ChartConfiguration } from "components/charts/helpers/Configuration";
import { prepareDailyChartData } from "lib/charts/helpers";
import { queryDailyAggregatedCredits } from "lib/charts/queries";
import {
  Bridge,
  ChartDateMappingParams,
  CreditsQueryParams,
  DailyCreditsChartDataItem,
} from "lib/charts/types";

export type DailyCreditsChartConfiguration = ChartConfiguration<
  CreditsQueryParams,
  ChartDateMappingParams,
  Bridge
>;

/* Fetches multiple verra credits aggregated by dates and merge them to be used in a chart */
export async function getDailyCredits(
  configuration: DailyCreditsChartConfiguration
) {
  return prepareDailyChartData<DailyCreditsChartDataItem, CreditsQueryParams>(
    configuration,
    (query) => {
      return queryDailyAggregatedCredits({
        bridge: query.bridge,
        status: query.status,
        operator: "cumsum",
        page_size: -1,
        sort_order: "asc",
      });
    }
  );
}
