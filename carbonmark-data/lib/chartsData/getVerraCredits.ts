import { BRIDGES } from "lib/constants";
import { prepareDailyChartData } from "./helpers";
import { queryDailyAggregatedCredits } from "./queries";

interface VerraCreditsChartData {
    toucan: number,
    c3: number,
    moss: number,
    date: number
}
export type ChartData = Array<VerraCreditsChartData>;

export async function getVerraCredits() {
    return prepareDailyChartData(BRIDGES, "bridged_date", (bridge) => {
        return queryDailyAggregatedCredits({
            bridge,
            status: "bridged",
            operator: "cumsum",
            page_size: -1,
            sort_order: "asc"
        })
    });
}
