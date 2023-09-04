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
  Token,
  TokenInfo,
  TokensInfo,
} from "./types";

/** Queries the Data API
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
  const errorMessage = `Failed to fetch ${url}`;
  if (!res.ok) {
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    // Handle JSON decoding errors
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/** Queries the Data API
   R: Type of the response
   Q: Type of the Query parameters
   Returns a default response in case a network error
*/
async function failsafeQuery<R, Q>(
  url: string,
  params: Q,
  defaultValue: R,
  revalidate?: number
): Promise<R> {
  try {
    return await query(url, params, revalidate);
  } catch (e) {
    // Catch errors and return an empty response so the page can still be rendered
    return Promise.resolve(defaultValue);
  }
}

/** Makes a paginated query the Data API
   - RI: Type of the response items
   - Q: Type of the Query parameters
*/
async function paginatedQuery<RI, Q>(
  url: string,
  params: Q | undefined = undefined,
  revalidate?: number
): Promise<PaginatedResponse<RI>> {
  return failsafeQuery(
    url,
    params,
    {
      items: [],
      items_count: 0,
      pages_count: 0,
      current_page: 0,
    },
    revalidate
  );
}

/** Queries the Credits Daily Aggregations endpoint */
export const queryDailyAggregatedCredits = function (
  params: CreditsQueryParams & AggregationQueryParams & PaginationQueryParams
): Promise<DailyCredits> {
  return paginatedQuery<
    DailyCreditsItem,
    CreditsQueryParams & AggregationQueryParams & PaginationQueryParams
  >(urls.api.dailyAggregatedCredits, params);
};

/** Queries the Credits Global Aggregations endpoint */
export const queryAggregatedCredits = function (
  params: CreditsQueryParams & AggregationQueryParams
): Promise<AggregatedCredits> {
  return failsafeQuery<AggregatedCredits, typeof params>(
    urls.api.aggregatedCredits,
    params,
    { quantity: 0 }
  );
};

/** Queries the Prices endpoint */
export const queryPrices = function (
  params: PaginationQueryParams
): Promise<Prices> {
  return paginatedQuery<PricesItem, typeof params>(urls.api.prices, params);
};

/** Queries the Tokens endpoint */
export const queryTokensInfo = function (): Promise<TokensInfo> {
  return paginatedQuery<TokenInfo, undefined>(urls.api.tokens);
};
/** Queries the Tokens endpoint and return info for a particular token */
export const queryTokenInfo = async function (
  token: Token
): Promise<TokenInfo | undefined> {
  const tokens = (await paginatedQuery<TokenInfo, undefined>(urls.api.tokens))
    .items;
  return tokens.find((tokenInfo) => tokenInfo.name.toLowerCase() == token);
};
