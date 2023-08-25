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
export interface CreditsQueryParams {
  bridge?: Bridge;
  pool?: Pool;
  status?: Status;
}
export interface AggregationQueryParams {
  operator?: "sum" | "cumsum";
}
export interface PaginationQueryParams {
  page_size?: number;
  sort_by?: number;
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

// ChartData mappings (used to transform API responses into chart data)
export interface ChartMappingParams {
  key: string; // When querying, the quantity attribute from the response will be mapped and merged to this key
  label: string; // A label to display on the chart. Defaults to key.
  color: string; // The color associated to the dataset
}
export interface ChartDateMappingParams {
  date_field: DateField; // The date_field expected in the response Object
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
