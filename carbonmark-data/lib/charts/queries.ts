import { urls } from "lib/constants";
import {
  AggregatedCredits,
  AggregationQueryParams,
  CreditsQueryParams,
  DailyCredits,
  DailyCreditsItem,
  PaginatedResponse,
  PaginationQueryParams,
} from "./types";

// Queries the Data API
async function query<T>(
  url: string,
  params: Record<string, string | number>,
  revalidate?: number
): Promise<T> {
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

// Makes a paginated query the Data API
async function paginatedQuery<T>(
  url: string,
  params: Record<string, string | number>,
  revalidate?: number
): Promise<PaginatedResponse<T>> {
  return query(url, params, revalidate);
}

// Queries the the Credits Daily Aggregations endpoint
export const queryDailyAggregatedCredits = function (
  params: CreditsQueryParams & AggregationQueryParams & PaginationQueryParams
): Promise<DailyCredits> {
  return paginatedQuery<DailyCreditsItem>(
    urls.api.dailyAggregatedCredits,
    params as unknown as Record<string, string>
  );
};

// Queries the the Credits Global Aggregations endpoint
export const queryAggregatedCredits = function (
  params: CreditsQueryParams & AggregationQueryParams
): Promise<AggregatedCredits> {
  return query<AggregatedCredits>(
    urls.api.aggregatedCredits,
    params as unknown as Record<string, string>
  );
};
