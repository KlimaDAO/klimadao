import { urls } from "lib/constants";
import {
  AggregatedCredits,
  AggregatedCreditsByBridgeAndVintageItem,
  AggregatedCreditsByCountryItem,
  AggregatedCreditsByPoolAndMethodologyItem,
  AggregatedCreditsByPoolAndVintageItem,
  AggregatedCreditsByProjectsItem,
  AggregationQueryParams,
  CarbonMetricsQueryParams,
  Chain,
  CreditsQueryParams,
  DailyCredits,
  DailyCreditsItem,
  KlimaMonthlyRetirementsByOriginItem,
  KlimaMonthlyRetirementsByTokenItem,
  KlimaRetirementsByBeneficiaryItem,
  MonthlyAggregatedCreditsByPoolItem,
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
  let errorMessage = `Failed to fetch ${url}`;
  let res: Response;
  try {
    res = await fetch(url, { next: { revalidate } });
  } catch (e) {
    // Handle HTTP errors
    throw new Error(errorMessage);
  }
  const text = await res.text();

  errorMessage = `${text} \n ${errorMessage}`;
  if (!res.ok) {
    // Handle HTTP errors
    throw new Error(errorMessage);
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    // Handle JSON decoding errors
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
    console.error(e);
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
): Promise<PaginatedResponse<KlimaMonthlyRetirementsByTokenItem>> {
  return paginatedQuery<
    KlimaMonthlyRetirementsByTokenItem,
    PaginationQueryParams
  >(urls.api.klimaMonthlyRetirementsByPool, params);
};

/** Queries the Credits Daily Aggregations endpoint */
export const queryMonthlyRetirementsByOrigin = function (
  params: PaginationQueryParams
): Promise<PaginatedResponse<KlimaMonthlyRetirementsByOriginItem>> {
  return paginatedQuery<
    KlimaMonthlyRetirementsByOriginItem,
    PaginationQueryParams
  >(urls.api.allMonthlyRetirementsByOrigin, params);
};

/** Queries the Klima raw retirements endpoint */
export const queryKlimaRawRetirements = function (
  params: PaginationQueryParams
): Promise<PaginatedResponse<RawRetirementsItem>> {
  return paginatedQuery<RawRetirementsItem, typeof params>(
    urls.api.klimaRawRetirements,
    params
  );
};

/** Queries the Global raw retirements endpoint */
export const queryAllRawRetirements = function (
  params: PaginationQueryParams
): Promise<PaginatedResponse<RawRetirementsItem>> {
  return paginatedQuery<RawRetirementsItem, typeof params>(
    urls.api.allRawRetirements,
    params
  );
};

/** Queries the Klima Retirements beneficiaries aggregation endpoint */
export const queryKlimaRetirementsByBeneficiary = function (
  params: PaginationQueryParams
): Promise<PaginatedResponse<KlimaRetirementsByBeneficiaryItem>> {
  return paginatedQuery<KlimaRetirementsByBeneficiaryItem, typeof params>(
    urls.api.klimaRetirementsByBeneficiary,
    params
  );
};

/** Queries the Carbon Metrics endpoint
 * RI is either DailyPolygonCarbonMetricsItem, DailyCeloCarbonMetricsItem or DailyEthCarbonMetricsItem
 */
export function queryCarbonMetrics<RI>(
  chain: Chain,
  params: PaginationQueryParams & CarbonMetricsQueryParams
): Promise<PaginatedResponse<RI>> {
  return paginatedQuery<RI, typeof params>(
    `${urls.api.dailyCarbonMetrics}/${chain}`,
    params
  );
}

/** Queries the Pools tokens & dates aggregation endpoint */
export function queryAggregatedCreditsByPoolAndDates(
  freq: string,
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<MonthlyAggregatedCreditsByPoolItem>> {
  return paginatedQuery<MonthlyAggregatedCreditsByPoolItem, typeof params>(
    `${urls.api.aggregatedCreditsByPoolAndDates}/${freq}`,
    params
  );
}

/** Queries the Credits pool and vintage aggregation endpoint */
export function queryAggregatedCreditsByPoolAndVintage(
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByPoolAndVintageItem>> {
  return paginatedQuery<AggregatedCreditsByPoolAndVintageItem, typeof params>(
    urls.api.aggregatedCreditsByPoolAndVintage,
    params
  );
}

/** Queries the Credits pool and methodology aggregation endpoint */
export function queryAggregatedCreditsByPoolAndMethodology(
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByPoolAndMethodologyItem>> {
  return paginatedQuery<
    AggregatedCreditsByPoolAndMethodologyItem,
    typeof params
  >(urls.api.aggregatedCreditsByPoolAndMethodology, params);
}

/** Queries the Credits countries aggregation endpoint */
export function queryAggregatedCreditsByCountry(
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByCountryItem>> {
  return paginatedQuery<AggregatedCreditsByCountryItem, typeof params>(
    urls.api.aggregatedCreditsByCountry,
    params
  );
}

/** Queries the Credits pool and vintage aggregation endpoint */
export function queryAggregatedCreditsByBridgeAndVintage(
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByBridgeAndVintageItem>> {
  return paginatedQuery<AggregatedCreditsByBridgeAndVintageItem, typeof params>(
    urls.api.aggregatedCreditsByBridgeAndVintage,
    params
  );
}
