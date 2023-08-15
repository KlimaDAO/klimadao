import { BRIDGES } from "lib/constants";
import { ChartData, prepareDailyChartData } from "./helpers";
import { queryDailyAggregatedCredits } from "./queries";

interface VerraCreditsChartDataItem {
  toucan: number;
  c3: number;
  moss: number;
  date: number;
}
export type VerraCreditsChartData = ChartData<VerraCreditsChartDataItem>;
export async function getVerraCredits() {
  return prepareDailyChartData<VerraCreditsChartDataItem>(
    BRIDGES,
    "bridged_date",
    (bridge) => {
      return queryDailyAggregatedCredits({
        bridge,
        status: "bridged",
        operator: "cumsum",
        page_size: -1,
        sort_order: "asc",
      });
    }
  );
}
