import { urls } from "lib/constants";
import {
  AggregationQueryParams,
  CreditsQueryParams,
  DailyAggregatedCredit,
  DailyAggregatedCredits,
  PaginatedResponse,
  PaginationQueryParams,
} from "./types";

// Queries the Data API
async function query<T>(
  url: string,
  params: Record<string, string | number>,
  revalidate?: number
): Promise<PaginatedResponse<T>> {
  // Default cache of 3600s
  revalidate = revalidate || 3600;
  url = `${url}?${new URLSearchParams(params as Record<string, string>)}`;
  const res = await fetch(url, { next: { revalidate } });

  if (!res.ok) {
    console.log(url);
    throw new Error((await res.json()).message);
  }
  return res.json();
}

// Queries the the Credits Daily Aggregations endpoint
export const queryDailyAggregatedCredits = function (
  params: CreditsQueryParams & AggregationQueryParams & PaginationQueryParams
): Promise<DailyAggregatedCredits> {
  return query<DailyAggregatedCredit>(
    urls.api.dailyAggregatedCredits,
    params as unknown as Record<string, string>
  );
};
