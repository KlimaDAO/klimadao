import { Key } from "react";

// API level Query parameters
export const BRIDGES = ["toucan", "c3", "moss"];
export const CHAIN = ["polygon", "eth", "celo"];
export const TOKENS = ["bct", "nct", "mco2", "ubo", "nbo"];
export type Bridge = (typeof BRIDGES)[number] | "offchain" | "all";
export type Token = (typeof TOKENS)[number];
export type Chain = (typeof CHAIN)[number];

export type DateField =
  | "bridged_date"
  | "redeemed_date"
  | "retirement_date"
  | "issuance_date"
  | "deposited_date";
export type Status =
  | "bridged"
  | "redeemed"
  | "retired"
  | "issued"
  | "deposited";
export type Pool = "ubo" | "nbo" | "nct" | "bct";
export interface AggregationQueryParams {
  operator?: "sum" | "cumsum";
}
export interface CarbonSupplyQueryParams {
  chain: Chain;
}
export interface CreditsQueryParams {
  bridge?: Bridge;
  pool?: Pool;
  status?: Status;
}
export interface PaginationQueryParams {
  page_size?: number;
  page?: number;
  sort_by?: string;
  sort_order?: string;
}
// API responses
export interface PaginatedResponse<RI> {
  items: Array<RI>;
  items_count: number;
  pages_count: number;
  current_page: number;
}
export interface DailyCreditsItem {
  bridged_date?: string;
  redeemed_date?: string;
  retirement_date?: string;
  issuance_date?: string;
  deposited_date?: string;
  quantity: number;
}
export type DailyCredits = PaginatedResponse<DailyCreditsItem>;

export interface DailyPolygonCarbonMetricsItem {
  date: string;
  bct_supply: number;
  nct_supply: number;
  mco2_supply: number;
  ubo_supply: number;
  nbo_supply: number;
  bct_redeemed: number;
  nct_redeemed: number;
  ubo_redeemed: number;
  nbo_redeemed: number;
  total_carbon_supply: number;
  mco2_retired: number;
  tco2_retired: number;
  c3t_retired: number;
  total_retirements: number;
  bct_klima_retired: number;
  nct_klima_retired: number;
  mco2_klima_retired: number;
  ubo_klima_retired: number;
  nco_klima_retired: number;
  total_klima_retirements: number;
  tco2_klima_retired: number;
  c3t_klima_retired: number;
  not_klima_retired: number;
}
export type DailyPolygonCarbonMetrics =
  PaginatedResponse<DailyPolygonCarbonMetricsItem>;

export interface DailyEthCarbonMetricsItem {
  date: string;
  mco2_supply: number;
  total_carbon_supply: number;
  mco2_retired: number;
  total_retirements: number;
}
export type DailyEthCarbonMetrics =
  PaginatedResponse<DailyEthCarbonMetricsItem>;

export interface DailyCeloCarbonMetricsItem {
  date: string;
  bct_supply: number;
  nct_supply: number;
  mco2_supply: number;
  total_carbon_supply: number;
  mco2_retired: number;
  total_retirements: number;
}
export type DailyCeloCarbonMetrics =
  PaginatedResponse<DailyCeloCarbonMetricsItem>;

export interface AggregatedCredits {
  quantity: number;
}

export interface PricesItem {
  date: string;
  bct_price: number;
  nct_price: number;
  mco2_price: number;
  ubo_price: number;
  nbo_price: number;
  quantity: number;
}
export type Prices = PaginatedResponse<PricesItem>;

export interface TokenInfo {
  name: string;
  pair_address: string;
  token_address: string;
  bridge: string;
  chain: string;
  selective_cost_value: number;
  decimals: number;
  current_supply: number;
  fee_redeem_factor: number;
  price: number;
}
export type TokensInfo = PaginatedResponse<TokenInfo>;

export interface KlimaMonthlyRetirementsItem {
  retirement_date: string;
  token: string;
  amount_retired: number;
  number_of_retirements: number;
  amount_retired_bct: number;
  number_of_retirements_bct: number;
  amount_retired_nct: number;
  number_of_retirements_nct: number;
  amount_retired_ubo: number;
  number_of_retirements_ubo: number;
  amount_retired_mco2: number;
  number_of_retirements_mco2: number;
  amount_retired_nbo: number;
  number_of_retirements_nbo: number;
}
export type KlimaMonthlyRetirements =
  PaginatedResponse<KlimaMonthlyRetirementsItem>;

export interface RawRetirementsItem {
  retirement_date: string;
  transaction_id: string;
  beneficiary: string;
  project_id: string;
  bridge: string;
  token: string;
  origin: string;
  proof: string;
  quantity: number;
}
export type RawRetirements = PaginatedResponse<RawRetirementsItem>;

// ChartData mappings (used to transform API responses into chart data)
export interface ChartMappingParams {
  source: string; // Qhen querying source field is renamed into destination
  destination: string;
}
export interface ChartDateMappingParams extends ChartMappingParams {
  dateField: DateField; // The date_field expected in the response Object
}

// Chart data: Generics
export type GenericChartDataItem = Record<Partial<string>, string | number>;
export type ChartData<T> = Array<T>;
export type GenericChartData = ChartData<GenericChartDataItem>;
export interface GenericAggregatedChartDataItem {
  id: string;
  label: string;
  color: string;
  quantity?: number;
}
export type GenericDailyChartDataItem = {
  date: number;
};
export type DailyChartData<CI extends GenericDailyChartDataItem> =
  ChartData<CI>;

// Chart data: Daily credits
export type DailyCreditsChartQueryParams = CreditsQueryParams &
  ChartMappingParams &
  ChartDateMappingParams;
export interface DailyCreditsChartDataItem extends GenericDailyChartDataItem {
  toucan?: number;
  c3?: number;
  moss?: number;
  offchain?: number;
  date: number;
}
export type DailyCreditsChartData = DailyChartData<DailyCreditsChartDataItem>;

// Chart data: Aggregated credits
export type AggregatedCreditsChartQueryParams = CreditsQueryParams &
  ChartMappingParams;
export interface AggregatedCreditsChartDataItem
  extends GenericAggregatedChartDataItem {
  quantity: number;
}

export type AggregatedCreditsChartData =
  ChartData<AggregatedCreditsChartDataItem>;

// Chart dictionnary for cards
export type ChartDictionnary = Record<Key, React.ReactNode>;
