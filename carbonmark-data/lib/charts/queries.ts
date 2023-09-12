import { urls } from "lib/constants";
import {
  AggregatedCredits,
  AggregatedCreditsByProjectsItem,
  AggregationQueryParams,
  CreditsQueryParams,
  DailyCredits,
  DailyCreditsItem,
  KlimaMonthlyRetirementsItem,
  PaginatedResponse,
  PaginationQueryParams,
  Prices,
  PricesItem,
  RawRetirementsItem,
  Token,
  TokenInfo,
  TokensInfo,
} from "./types";

export const EMPTY_PAGINATED_RESPONSE = {
  items: [],
  items_count: 0,
  pages_count: 0,
  current_page: 0,
};

/** Queries the Data API
   R: Type of the response
   Q: Type of the Query parameters
*/
async function query<R, Q extends object>(
  url: string,
  params: Q | undefined,
  revalidate?: number
): Promise<R> {
  // Default cache of 3600s
  revalidate = revalidate || 3600;
  // Remove undefined parameters
  if (params) {
    const cleanParams = (
      Object.keys(params) as Array<keyof typeof params>
    ).reduce(
      (res, key) => {
        if (params[key] !== undefined) res[key] = params[key];
        return res;
      },
      {} as typeof params
    );
    const searchParams = new URLSearchParams(
      cleanParams as Record<string, string>
    );
    if (searchParams.toString().length > 0) url = `${url}?${searchParams}`;
  }
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
async function failsafeQuery<R, Q extends object>(
  url: string,
  params: Q | undefined,
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
async function paginatedQuery<RI, Q extends object | undefined>(
  url: string,
  params: Q | undefined = undefined,
  revalidate?: number
): Promise<PaginatedResponse<RI>> {
  return failsafeQuery(url, params, EMPTY_PAGINATED_RESPONSE, revalidate);
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

/** Queries the Credits Aggregations by projects endpoint */
export const queryAggregatedCreditsByProjects = function (
  params: CreditsQueryParams & AggregationQueryParams & PaginationQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByProjectsItem>> {
  return paginatedQuery<AggregatedCreditsByProjectsItem, typeof params>(
    urls.api.aggregatedCreditsByProjects,
    params
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

/** Queries the monthly aggregated Klima retirements endpoint */
export const queryKlimaMonthlyRetirementsByPool = async function (
  params: PaginationQueryParams
): Promise<PaginatedResponse<KlimaMonthlyRetirementsItem>> {
  return paginatedQuery<KlimaMonthlyRetirementsItem, PaginationQueryParams>(
    urls.api.klimaMonthlyRetirementsByPool,
    params
  );
};

/** Queries the Klima Raw Retirements endpoint */
export const queryRawKlimaRetirements = function (
  params: PaginationQueryParams
): Promise<PaginatedResponse<RawRetirementsItem>> {
  return paginatedQuery<RawRetirementsItem, typeof params>(
    urls.api.klimaRawRetirements,
    params
  );
};
