import { ChartConfiguration } from "components/charts/helpers/Configuration";

// API level Query parameters
export const BRIDGES = ["toucan", "c3", "moss"];
export const CHAIN = ["polygon", "eth", "celo"];
export const TOKENS = ["bct", "nct", "mco2", "ubo", "nbo"];
export const PROTOCOLS = ["c3t", "tco2", "mco2"];
export type Pool = "ubo" | "nbo" | "nct" | "bct" | "moss" | "all";
export type Bridge = (typeof BRIDGES)[number] | "offchain" | "all";
export type Chain = (typeof CHAIN)[number];
export type Token = (typeof TOKENS)[number];
export type Protocol = (typeof PROTOCOLS)[number];
export type DateFilteringOption = "lifetime" | "last30d" | "last7d";
export type DateAggregationFrequency = "daily" | "monthly";

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
  | "all_retired"
  | "issued"
  | "deposited";

export interface CarbonSupplyQueryParams {
  chain: Chain;
}
export type CreditsQueryParams = {
  bridge?: Bridge;
  pool?: Pool;
  status?: Status;
} & DateFieldQueryParamsInterface;
export interface SortQueryParams {
  sort_by?: string;
  sort_order?: "asc" | "desc";
}
export interface PaginationQueryParams extends SortQueryParams {
  page_size?: number;
  page?: number;
}
export interface CarbonMetricsQueryParams {
  sample?: string;
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
export interface BridgeQuantitiesInterface {
  toucan_quantity: number;
  c3_quantity: number;
  moss_quantity: number;
  offchain_quantity: number;
  total_quantity: number;
  bridge_quantity: number;
  bridge_ratio: number;
  not_bridge_quantity?: number;
}
export interface PoolQuantitiesInterface {
  bct_quantity: number;
  nct_quantity: number;
  mco2_quantity: number;
  ubo_quantity: number;
  nbo_quantity: number;
}
export interface OriginInterface {
  country: string;
  country_code: string;
}
export interface ProjecTypeInterface {
  project_type: string;
}
export interface AggregatedCreditsByDatesItem extends DateFieldInterface {
  quantity: number;
}
export type AggregatedCreditsByDates =
  PaginatedResponse<AggregatedCreditsByDatesItem>;

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
  total_toucan_supply: number;
  total_c3_supply: number;
  total_moss_supply: number;
  total_retirements: number;
}

export type CarbonMetrics = PaginatedResponse<CarbonMetricsItem>;
export interface AggregatedCreditsByProjectItem {
  project_type: string;
  quantity: number;
}
export type AggregatedCreditsByProject =
  PaginatedResponse<AggregatedCreditsByProjectItem>;

export interface AggregatedCreditsByMethodologyItem
  extends PoolQuantitiesInterface {
  methodology: string;
  quantity: number;
}
export type AggregatedCreditsByMethodology =
  PaginatedResponse<AggregatedCreditsByMethodologyItem>;

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
  not_pooled_quantity: number;
  total_quantity: number;
}
export type AggregatedCreditsByPool = PoolQuantitiesInterface;

export interface MonthlyAggregatedCreditsByPoolItem
  extends PoolQuantitiesInterface,
    DateFieldInterface {}
export type MonthlyAggregatedCreditsByPool =
  PaginatedResponse<MonthlyAggregatedCreditsByPoolItem>;

export interface AggregatedCreditsByPoolAndVintageItem
  extends PoolQuantitiesInterface {
  vintage: number;
  total_quantity: number;
}
export type AggregatedCreditsByPoolAndVintage =
  PaginatedResponse<AggregatedCreditsByPoolAndVintageItem>;

export interface AggregatedCreditsByPoolAndMethodologyItem
  extends PoolQuantitiesInterface {
  methodology: string;
  total_quantity: number;
}
export type AggregatedCreditsByPoolAndMethodology =
  PaginatedResponse<AggregatedCreditsByPoolAndMethodologyItem>;

export interface AggregatedCreditsByPoolAndProjectItem
  extends PoolQuantitiesInterface,
    ProjecTypeInterface {}
export type AggregatedCreditsByPoolAndProject =
  PaginatedResponse<AggregatedCreditsByPoolAndProjectItem>;

export interface AggregatedCreditsByCountryItem extends OriginInterface {
  quantity: number;
}
export type AggregatedCreditsByCountry =
  PaginatedResponse<AggregatedCreditsByCountryItem>;

export interface AggregatedCreditsByVintageItem {
  quantity: number;
  vintage: number;
}
export type AggregatedCreditsByVintage =
  PaginatedResponse<AggregatedCreditsByVintageItem>;

export interface AggregatedCreditsByBridgeAndVintageItem
  extends BridgeQuantitiesInterface {
  vintage: number;
}
export type AggregatedCreditsByBridgeAndVintage =
  ChartData<AggregatedCreditsByBridgeAndVintageItem>;

export interface AggregatedCreditsByBridgeAndProjectItem
  extends BridgeQuantitiesInterface,
    ProjecTypeInterface {}
export type AggregatedCreditsByBridgeAndProject =
  ChartData<AggregatedCreditsByBridgeAndProjectItem>;

export interface AggregatedCreditsByBridgeAndOriginItem
  extends BridgeQuantitiesInterface,
    OriginInterface {}
export type AggregatedCreditsByBridgeAndOrigin =
  ChartData<AggregatedCreditsByBridgeAndOriginItem>;

export interface AggregatedCreditsByBridgeAndDateItem
  extends BridgeQuantitiesInterface {
  issuance_date: number;
}
export type AggregatedCreditsByBridgeAndDate =
  ChartData<AggregatedCreditsByBridgeAndDateItem>;

export type AggregatedCreditsByBridge = BridgeQuantitiesInterface;

export interface MonthlyAggregatedCreditsByPoolItem
  extends PoolQuantitiesInterface,
    DateFieldInterface {}

export interface AggregatedCreditsByOriginItem extends OriginInterface {
  quantity: number;
}

export type AggregatedCreditsByOrigin =
  PaginatedResponse<AggregatedCreditsByOriginItem>;

// ChartData mappings (used to transform API responses into chart data)

/** instances of this interface describes how to transform query results into chart data
 * CI: type of the chartdata items
 */
export interface ChartMappingParams<SCI, DCI> {
  source: keyof SCI; // When querying source field is renamed into destination
  destination: keyof DCI;
}
export interface ChartDateMappingParams<SCI, DCI>
  extends ChartMappingParams<SCI, DCI> {
  dateField: DateField; // The date_field expected in the response Object
}

// Chart data: Generics
export type ChartData<T> = Array<T>;

export type GenericDailyChartDataItem = {
  date: number;
};
export type DailyChartData<CI extends GenericDailyChartDataItem> =
  ChartData<CI>;

// Chart data: credits
export interface DailyCreditsChartDataItem
  extends GenericDailyChartDataItem,
    PoolQuantitiesInterface,
    BridgeQuantitiesInterface {}
export type DailyCreditsChartData = DailyChartData<DailyCreditsChartDataItem>;

export type DailyCreditsQueryConfiguration = Array<{
  query: CreditsQueryParams;
  mapping: ChartDateMappingParams<
    AggregatedCreditsByDatesItem,
    DailyCreditsChartDataItem
  >;
}>;
export type DailyCreditsChartConfiguration = ChartConfiguration<Bridge>;

// Chat Data: Treemaps
export type TreeMapItem<P> = P & {
  name?: string;
  children?: TreeMapData<P>;
};
export type TreeMapData<P> = Array<TreeMapItem<P>>;

/** Node dictionnary for cards or tab */
export type NodeDictionnary = Record<string | number | symbol, React.ReactNode>;
