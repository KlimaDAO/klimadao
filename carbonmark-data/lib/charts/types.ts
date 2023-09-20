import { Key } from "react";

// API level Query parameters
export const BRIDGES = ["toucan", "c3", "moss"];
export const CHAIN = ["polygon", "eth", "celo"];
export const TOKENS = ["bct", "nct", "mco2", "ubo", "nbo"];
export const PROTOCOLS = ["c3t", "tco2", "mco2"];
export type Pool = "ubo" | "nbo" | "nct" | "bct" | "all";
export type Bridge = (typeof BRIDGES)[number] | "offchain" | "all";
export type Chain = (typeof CHAIN)[number];
export type Token = (typeof TOKENS)[number];
export type Protocol = (typeof PROTOCOLS)[number];
export type DateFilteringOption = "lifetime" | "last30d" | "last7d";

export interface DateFieldInterface {
  bridged_date?: string;
  redeemed_date?: string;
  retirement_date?: string;
  issuance_date?: string;
  deposited_date?: string;
}
export type DateField = keyof DateFieldInterface;
export interface DateFieldQueryParamsInterface {
  bridged_date_gt?: string;
  redeemed_date_gt?: string;
  retirement_date_gt?: string;
  issuance_date_gt?: string;
  deposited_date_gt?: string;
  bridged_date_lt?: string;
  redeemed_date_lt?: string;
  retirement_date_lt?: string;
  issuance_date_lt?: string;
  deposited_date_lt?: string;
}
export type DateFieldParam = keyof DateFieldQueryParamsInterface;
export type Status =
  | "bridged"
  | "redeemed"
  | "retired"
  | "issued"
  | "deposited";
export interface AggregationQueryParams {
  operator?: "sum" | "cumsum";
}
export interface CarbonSupplyQueryParams {
  chain: Chain;
}
export type CreditsQueryParams = {
  bridge?: Bridge;
  pool?: Pool;
  status?: Status;
} & DateFieldQueryParamsInterface;
export interface PaginationQueryParams {
  page_size?: number;
  page?: number;
  sort_by?: string;
  sort_order?: string;
}
export interface CarbonMetricsQueryParams {
  sample?: string;
}

// API responses
export interface PaginatedResponse<RI> {
  items: Array<RI>;
  items_count: number;
  pages_count: number;
  current_page: number;
}
export interface DailyCreditsItem extends DateFieldInterface {
  quantity: number;
}
export type DailyCredits = PaginatedResponse<DailyCreditsItem>;

export interface CarbonMetricsItem {
  date: string;
  bct_supply_polygon: number;
  nct_supply_polygon: number;
  mco2_supply_polygon: number;
  ubo_supply_polygon: number;
  nbo_supply_polygon: number;
  bct_redeemed_polygon: number;
  nct_redeemed_polygon: number;
  ubo_redeemed_polygon: number;
  nbo_redeemed_polygon: number;
  total_carbon_supply_polygon: number;
  mco2_retired_polygon: number;
  tco2_retired_polygon: number;
  c3t_retired_polygon: number;
  total_retirements_polygon: number;
  bct_klima_retired_polygon: number;
  nct_klima_retired_polygon: number;
  mco2_klima_retired_polygon: number;
  ubo_klima_retired_polygon: number;
  nco_klima_retired_polygon: number;
  tco2_klima_retired_polygon: number;
  c3t_klima_retired_polygon: number;
  not_klima_retired_polygon: number;
  total_klima_retirements_polygon: number;
  mco2_supply_eth: number;
  total_carbon_supply_eth: number;
  mco2_retired_eth: number;
  total_retirements_eth: number;
  bct_supply_celo: number;
  nct_supply_celo: number;
  mco2_supply_celo: number;
  total_carbon_supply_celo: number;
  mco2_retired_celo: number;
  total_retirements_celo: number;
  total_retirements: number;
}

export type CarbonMetrics = PaginatedResponse<CarbonMetricsItem>;
export interface AggregatedCreditsByProjectsItem {
  project_type: string;
  quantity: number;
}
export type AggregatedCreditsByProjects =
  PaginatedResponse<AggregatedCreditsByProjects>;
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

export interface KlimaMonthlyRetirementsByTokenItem {
  retirement_date: string;
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
export type KlimaMonthlyRetirementsBytoken =
  PaginatedResponse<KlimaMonthlyRetirementsByTokenItem>;

export interface KlimaMonthlyRetirementsByOriginItem {
  retirement_date: string;
  amount_retired_offchain: number;
  number_of_retirements_offchain: number;
  amount_retired_klima: number;
  number_of_retirements_klima: number;
}
export type KlimaMonthlyRetirementsByOrigin =
  PaginatedResponse<KlimaMonthlyRetirementsByOriginItem>;

export interface KlimaRetirementsByBeneficiaryItem {
  beneficiary: string;
  amount_retired: number;
  number_of_retirements: number;
}
export type KlimaRetirementsByBeneficiary =
  PaginatedResponse<KlimaRetirementsByBeneficiaryItem>;

export interface RawRetirementsItem {
  retirement_date: string;
  transaction_id: string;
  beneficiary: string;
  project_id: string;
  bridge: string;
  token: string;
  origin: string;
  quantity: number;
  serial_number: string;
}
export type RawRetirements = PaginatedResponse<RawRetirementsItem>;
export interface PoolQuantitiesInterface {
  bct_quantity: number;
  nct_quantity: number;
  mco2_quantity: number;
  ubo_quantity: number;
  nbo_quantity: number;
}
export interface MonthlyAggregatedCreditsByPoolItem
  extends PoolQuantitiesInterface,
    DateFieldInterface {
  bct_quantity: number;
  nct_quantity: number;
  mco2_quantity: number;
  ubo_quantity: number;
  nbo_quantity: number;
}
export type MonthlyAggregatedCreditsByPool =
  PaginatedResponse<MonthlyAggregatedCreditsByPoolItem>;

export interface AggregatedCreditsByPoolAndVintageItem
  extends PoolQuantitiesInterface {
  vintage: number;
  total_quantity: number;
}
export type AggregatedCreditsByPoolAndVintage =
  PaginatedResponse<AggregatedCreditsByPoolAndVintageItem>;

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

// Chat Data: Treemaps
export interface TreeMapItem {
  name: string;
  size?: number;
  children?: TreeMapData;
}
export type TreeMapData = Array<TreeMapItem>;

/** Node dictionnary for cards or tab */
export type NodeDictionnary = Record<Key, React.ReactNode>;
