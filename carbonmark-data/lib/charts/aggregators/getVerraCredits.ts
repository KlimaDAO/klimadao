import { prepareDailyChartData } from "lib/charts/helpers";
import { queryDailyAggregatedCredits } from "lib/charts/queries";
import {
  CreditsChartDataItem,
  CreditsChartQueryParams,
} from "lib/charts/types";

/* Fetches multiple verra credits aggregated by dates and merge them to be processed by a chart */
export async function getVerraCredits(queries: Array<CreditsChartQueryParams>) {
  return prepareDailyChartData<CreditsChartDataItem, CreditsChartQueryParams>(
    queries,
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
