import { urls } from "lib/constants";
import {
  AggregationParams,
  CreditsParams,
  DailyAggregatedCredits,
  PaginationParams,
} from "./types";

// Queries the Data API
const query = async function (
  url: string,
  params: Record<string, string | number>,
  revalidate?: number
): Promise<any> {
  // Default cache of 3600s
  revalidate = revalidate || 3600;
  url = `${url}?${new URLSearchParams(params as Record<string, string>)}`;
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) {
    throw new Error((await res.json()).message);
  }
  return res.json();
};

export const queryDailyAggregatedCredits: (
  params: CreditsParams & AggregationParams & PaginationParams
) => Promise<DailyAggregatedCredits> = function (params) {
  return query(
    urls.api.dailyAggregatedCredits,
    params as Record<string, string>
  );
};
