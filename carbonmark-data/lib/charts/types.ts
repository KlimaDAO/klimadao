// Query parameters
export type Bridge = "toucan" | "c3" | "moss";
export type DatesAttribute =
  | "bridged_date"
  | "redeemed_date"
  | "retirement_date"
  | "issued_date"
  | "deposited_date";
export type Status =
  | "bridged"
  | "redeemed"
  | "retired"
  | "issued"
  | "deposited";
export type Pool = "ubo" | "nbo" | "nct" | "bct";
export interface CreditsParams {
  bridge?: Bridge;
  pool?: Pool;
  status?: Status;
}
export interface AggregationParams {
  operator?: "sum" | "cumsum";
}
export interface PaginationParams {
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
  issued_date?: string;
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
//export type GenericChartData = Array<GenericChartDataEntry>;
export type DailyChartData<CI extends GenericDailyChartDataEntry> = Array<CI>;

export interface VerraCreditsChartDataItem extends GenericDailyChartDataEntry {
  toucan: number;
  c3: number;
  moss: number;
  date: number;
}
export type VerraCreditsChartData = DailyChartData<VerraCreditsChartDataItem>;

export type AnyChartData = VerraCreditsChartData;
