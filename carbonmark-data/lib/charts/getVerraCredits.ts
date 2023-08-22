import { prepareDailyChartData } from "./helpers";
import { CreditsChartQueryParams } from "./options";
import { queryDailyAggregatedCredits } from "./queries";
import { CreditsChartDataItem } from "./types";

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
    },
  );
}
