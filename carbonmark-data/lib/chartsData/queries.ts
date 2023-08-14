import { urls } from "lib/constants";
import { AggregationParams, CreditsParams, DailyAggregatedCredits, PaginationParams } from "./types";

// Queries the Data API
const query: (url: string, params: Record<string, string | number>) => Promise<any> = async function (url: string, params: Record<string, string | number>) {
    url = `${url}?${new URLSearchParams(params as Record<string, string>)}`
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error((await res.json()).message);
    }
    return res.json();
};

export const queryDailyAggregatedCredits: (params: CreditsParams & AggregationParams & PaginationParams) => Promise<DailyAggregatedCredits> = function (params) {
    return query(urls.api.dailyAggregatedCredits, params as Record<string, string>);
}