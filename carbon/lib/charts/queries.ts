import {
  CACHE_DURATION_SECONDS,
  TOKENS_CACHE_DURATION_SECONDS,
  urls,
} from "lib/constants";
import {
  AggregatedCredits,
  AggregatedCreditsByBridge,
  AggregatedCreditsByBridgeAndDateItem,
  AggregatedCreditsByBridgeAndOriginItem,
  AggregatedCreditsByBridgeAndProjectItem,
  AggregatedCreditsByBridgeAndVintageItem,
  AggregatedCreditsByDates,
  AggregatedCreditsByDatesItem,
  AggregatedCreditsByMethodologyItem,
  AggregatedCreditsByOriginItem,
  AggregatedCreditsByPool,
  AggregatedCreditsByPoolAndMethodologyItem,
  AggregatedCreditsByPoolAndProjectItem,
  AggregatedCreditsByPoolAndVintageItem,
  AggregatedCreditsByProjectItem,
  AggregatedCreditsByVintageItem,
  CarbonMetricsQueryParams,
  Chain,
  CreditsQueryParams,
  DateAggregationFrequency,
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
  pages_count: 1,
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
  // Default cache
  revalidate = revalidate || CACHE_DURATION_SECONDS;
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
    console.error(e);
    throw new Error(errorMessage);
  }
  const text = await res.text();
  errorMessage = `${text} \n status:  ${res.status} ${res.statusText} \n ${errorMessage}`;
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
async function failsafeQuery<R, Q extends object | undefined>(
  url: string,
  params: Q | undefined,
  defaultValue: R,
  revalidate?: number
): Promise<R> {
  try {
    return await query(url, params, revalidate);
  } catch (e) {
    // Catch errors and return an empty response so the page can still be rendered
    console.error(e.message);
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
export const queryAggregatedCreditsByDates = function (
  freq: DateAggregationFrequency,
  params: CreditsQueryParams & PaginationQueryParams
): Promise<AggregatedCreditsByDates> {
  return paginatedQuery<
    AggregatedCreditsByDatesItem,
    CreditsQueryParams & PaginationQueryParams
  >(`${urls.api.aggregatedCreditsByDate}/${freq}`, params);
};

/** Queries the Credits Global Aggregations endpoint */
export const queryAggregatedCredits = function (
  params: CreditsQueryParams
): Promise<AggregatedCredits> {
  return failsafeQuery<AggregatedCredits, typeof params>(
    urls.api.aggregatedCredits,
    params,
    { quantity: 0 }
  );
};

/** Queries the Credits Aggregations by projects endpoint */
export const queryAggregatedCreditsByProject = function (
  params: CreditsQueryParams & PaginationQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByProjectItem>> {
  return paginatedQuery<AggregatedCreditsByProjectItem, typeof params>(
    urls.api.aggregatedCreditsByProject,
    params
  );
};

/** Queries the Credits Aggregations by methodology endpoint */
export const queryAggregatedCreditsByMethodology = function (
  params: CreditsQueryParams & PaginationQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByMethodologyItem>> {
  return paginatedQuery<AggregatedCreditsByMethodologyItem, typeof params>(
    urls.api.aggregatedCreditsByMethodology,
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
  return paginatedQuery<TokenInfo, undefined>(
    urls.api.tokens,
    undefined,
    TOKENS_CACHE_DURATION_SECONDS
  );
};
/** Queries the Tokens endpoint and return info for a particular token */
export const queryTokenInfo = async function (
  token: Token
): Promise<TokenInfo | undefined> {
  const tokens = (await queryTokensInfo()).items;
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
export function queryAggregatedCreditsByPoolAndDate(
  freq: DateAggregationFrequency,
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<MonthlyAggregatedCreditsByPoolItem>> {
  return paginatedQuery<MonthlyAggregatedCreditsByPoolItem, typeof params>(
    `${urls.api.aggregatedCreditsByPoolAndDate}/${freq}`,
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

/** Queries the Credits pool and methodology aggregation endpoint */
export function queryAggregatedCreditsByPoolAndProject(
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByPoolAndProjectItem>> {
  return paginatedQuery<AggregatedCreditsByPoolAndProjectItem, typeof params>(
    urls.api.aggregatedCreditsByPoolAndProject,
    params
  );
}

/** Queries the Credits countries aggregation endpoint */
export function queryAggregatedCreditsByOrigin(
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByOriginItem>> {
  return paginatedQuery<AggregatedCreditsByOriginItem, typeof params>(
    urls.api.aggregatedCreditsByCountry,
    params
  );
}

/** Queries the Credits countries aggregation endpoint */
export function queryAggregatedCreditsByVintage(
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByVintageItem>> {
  return paginatedQuery<AggregatedCreditsByVintageItem, typeof params>(
    urls.api.aggregatedCreditsByVintage,
    params
  );
}

/** Queries the Credits bridge and vintage aggregation endpoint */
export function queryAggregatedCreditsByBridgeAndVintage(
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByBridgeAndVintageItem>> {
  return paginatedQuery<AggregatedCreditsByBridgeAndVintageItem, typeof params>(
    urls.api.aggregatedCreditsByBridgeAndVintage,
    params
  );
}

/** Queries the Credits bridge and project aggregation endpoint */
export function queryAggregatedCreditsByBridgeAndProject(
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByBridgeAndProjectItem>> {
  return paginatedQuery<AggregatedCreditsByBridgeAndProjectItem, typeof params>(
    urls.api.aggregatedCreditsByBridgeAndProject,
    params
  );
}

/** Queries the Credits bridge and countries aggregation endpoint */
export function queryAggregatedCreditsByBridgeAndOrigin(
  params: PaginationQueryParams & CreditsQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByBridgeAndOriginItem>> {
  return paginatedQuery<AggregatedCreditsByBridgeAndOriginItem, typeof params>(
    urls.api.aggregatedCreditsByBridgeAndCountry,
    params
  );
}

/** Queries the Credits Aggregations by bridge endpoint */
export const queryAggregatedCreditsByBridgeAndDate = function (
  params: CreditsQueryParams
): Promise<PaginatedResponse<AggregatedCreditsByBridgeAndDateItem>> {
  return paginatedQuery<AggregatedCreditsByBridgeAndDateItem, typeof params>(
    urls.api.aggregatedCreditsByBridgeAndDate,
    params
  );
};

/** Queries the Credits Aggregations by bridge endpoint */
export const queryAggregatedCreditsByBridge = function (
  params?: CreditsQueryParams
): Promise<AggregatedCreditsByBridge> {
  return failsafeQuery<AggregatedCreditsByBridge, typeof params>(
    urls.api.aggregatedCreditsByBridge,
    params,
    {
      toucan_quantity: 0,
      c3_quantity: 0,
      moss_quantity: 0,
      offchain_quantity: 0,
      total_quantity: 0,
      not_bridge_quantity: 0,
      bridge_quantity: 0,
      bridge_ratio: 0,
    }
  );
};
/** Queries the Credits Aggregations by pool endpoint */
export const queryAggregatedCreditsByPool = function (
  params?: CreditsQueryParams
): Promise<AggregatedCreditsByPool> {
  return failsafeQuery<AggregatedCreditsByPool, typeof params>(
    urls.api.aggregatedCreditsByPool,
    params,
    {
      bct_quantity: 0,
      nct_quantity: 0,
      mco2_quantity: 0,
      ubo_quantity: 0,
      nbo_quantity: 0,
      total_quantity: 0,
      not_pooled_quantity: 0,
    }
  );
};

/** Queries the Pools volumes aggregations by date endpoint */
export const queryAggregatedPoolVolumesByDates = function (
  freq: DateAggregationFrequency,
  params: CreditsQueryParams & PaginationQueryParams
): Promise<AggregatedCreditsByDates> {
  return paginatedQuery<
    AggregatedCreditsByDatesItem,
    CreditsQueryParams & PaginationQueryParams
  >(`${urls.api.aggregatedPoolVolumeByDate}/${freq}`, params);
};
