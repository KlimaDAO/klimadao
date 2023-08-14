// API responses
export interface DailyAggregatedCredit {
    bridged_date: string,
    quantity: number
}
export interface PaginatedResponse<T> {
    items: Array<T>,
    items_count: number,
    pages_count: number,
    current_page: number,
}
export type DailyAggregatedCredits = PaginatedResponse<DailyAggregatedCredit>;

// Query parameters
export interface CreditsParams {
    bridge?: string,
    pool?: string,
    status?: string
}
export interface AggregationParams {
    operator?: "sum" | "cumsum"
}
export interface PaginationParams {
    page_size?: number,
    sort_by?: number,
    sort_order?: string,
}
