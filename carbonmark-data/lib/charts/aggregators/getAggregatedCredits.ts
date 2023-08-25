import {
  AggregatedCreditsChartDataItem,
  AggregatedCreditsChartQueryParams,
} from "lib/charts/types";
import { prepareAggregatedChartData } from "../helpers";
import { queryAggregatedCredits } from "../queries";
/* Fetches multiple verra credits globally aggregated and merge them to be used in a chart */
export async function getAggregatedCredits(
  queries: Array<AggregatedCreditsChartQueryParams>
) {
  return prepareAggregatedChartData<
    AggregatedCreditsChartDataItem,
    AggregatedCreditsChartQueryParams
  >(queries, (query) => {
    return queryAggregatedCredits({
      bridge: query.bridge,
      status: query.status,
    });
  });
}
