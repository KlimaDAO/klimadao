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
export interface DailyAggregatedCredit {
  bridged_date?: string;
  redeemed_date?: string;
  retirement_date?: string;
  issuance_date?: string;
  deposited_date?: string;
  quantity: number;
}
export type DailyAggregatedCredits = PaginatedResponse<DailyAggregatedCredit>;

// Chart data
export type GenericChartDataEntry = Record<Partial<string>, string | number>;
export type ChartData<T> = Array<T>;
export type GenericChartData = ChartData<GenericChartDataEntry>;
export type GenericDailyChartDataEntry = {
  date: number;
};
export type DailyChartData<CI extends GenericDailyChartDataEntry> =
  ChartData<CI>;
export interface CreditsChartDataItem extends GenericDailyChartDataEntry {
  toucan?: number;
  c3?: number;
  moss?: number;
  offchain?: number;
  date: number;
}
export type CreditsChartData = DailyChartData<CreditsChartDataItem>;
export type AnyChartData = CreditsChartData;

// Response to ChartData mappings
export interface ChartMappingParams {
  key: string; // When querying the quantity attribute from the response will be mapped to this value to enable merging for charts
  date_field: DateField; // The date_field to use in the response Object
}
export type CreditsChartQueryParams = CreditsQueryParams & ChartMappingParams;
