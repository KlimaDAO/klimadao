import { urls } from "lib/constants";
import {
  AggregatedCredits,
  AggregationQueryParams,
  CreditsQueryParams,
  DailyCredits,
  DailyCreditsItem,
  PaginatedResponse,
  PaginationQueryParams,
  Prices,
  PricesItem,
} from "./types";

/* Queries the Data API
   R: Type of the response
   Q: Type of the Query parameters
*/
async function query<R, Q>(
  url: string,
  params: Q,
  revalidate?: number
): Promise<R> {
  // Default cache of 3600s
  revalidate = revalidate || 3600;
  const searchParams = new URLSearchParams(params as Record<string, string>);
  if (searchParams.toString().length > 0) url = `${url}?${searchParams}`;
  const res = await fetch(url, { next: { revalidate } });
  // Handle HTTP errors
  if (!res.ok) {
    console.error(url);
    throw new Error((await res.json()).message);
  }
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    // Handle JSON decoding errors
    throw new Error(`${url}\n${text}`);
  }
}

/* Makes a paginated query the Data API
   - RI: Type of the response items
   - Q: Type of the Query parameters
*/
async function paginatedQuery<RI, Q>(
  url: string,
  params: Q | undefined = undefined,
  revalidate?: number
): Promise<PaginatedResponse<RI>> {
  return query(url, params, revalidate);
}

// Queries the Credits Daily Aggregations endpoint
export const queryDailyAggregatedCredits = function (
  params: CreditsQueryParams & AggregationQueryParams & PaginationQueryParams
): Promise<DailyCredits> {
  return paginatedQuery<
    DailyCreditsItem,
    CreditsQueryParams & AggregationQueryParams & PaginationQueryParams
  >(urls.api.dailyAggregatedCredits, params);
};

// Queries the Credits Global Aggregations endpoint
export const queryAggregatedCredits = function (
  params: CreditsQueryParams & AggregationQueryParams
): Promise<AggregatedCredits> {
  return query<AggregatedCredits, typeof params>(
    urls.api.aggregatedCredits,
    params
  );
};

// Queries the Prices endpoint
export const queryPrices = function (
  params: PaginationQueryParams
): Promise<Prices> {
  return paginatedQuery<PricesItem, typeof params>(urls.api.prices, params);
};
