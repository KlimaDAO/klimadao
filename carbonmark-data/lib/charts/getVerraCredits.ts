import { BRIDGES } from "lib/constants";
import { prepareDailyChartData } from "./helpers";
import { queryDailyAggregatedCredits } from "./queries";
import { Bridge, VerraCreditsChartDataItem } from "./types";

export async function getVerraCredits() {
  return prepareDailyChartData<VerraCreditsChartDataItem, Bridge>(
    BRIDGES,
    "bridged_date",
    (bridge) => {
      return queryDailyAggregatedCredits({
        bridge: bridge,
        status: "bridged",
        operator: "cumsum",
        page_size: -1,
        sort_order: "asc",
      });
    }
  );
}
