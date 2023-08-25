import { prepareDailyChartData } from "lib/charts/helpers";
import { queryDailyAggregatedCredits } from "lib/charts/queries";
import {
  DailyCreditsChartDataItem,
  DailyCreditsChartQueryParams,
} from "lib/charts/types";

/* Fetches multiple verra credits aggregated by dates and merge them to be used in a chart */
export async function getDailyCredits(
  queries: Array<DailyCreditsChartQueryParams>
) {
  return prepareDailyChartData<
    DailyCreditsChartDataItem,
    DailyCreditsChartQueryParams
  >(queries, (query) => {
    return queryDailyAggregatedCredits({
      bridge: query.bridge,
      status: query.status,
      operator: "cumsum",
      page_size: -1,
      sort_order: "asc",
    });
  });
}
