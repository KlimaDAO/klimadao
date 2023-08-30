import { Key } from "react";

// API level Query parameters
export type Bridge = "offchain" | "all" | "toucan" | "c3" | "moss";
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

export interface CreditsQueryParams {
  bridge?: Bridge;
  pool?: Pool;
  status?: Status;
}
export interface PaginationQueryParams {
  page_size?: number;
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
