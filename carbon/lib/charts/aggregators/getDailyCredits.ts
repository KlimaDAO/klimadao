import { queryAggregatedCreditsByDates } from "lib/charts/queries";
import {
  DailyCreditsQueryConfiguration,
  DateAggregationFrequency,
} from "lib/charts/types";
import { getMergedVolumes } from "../helpers";

/* Fetches multiple verra credits aggregated by dates and merge them to be used in a chart */
export async function getMergedCreditsByDate(
  freq: DateAggregationFrequency,
  configuration: DailyCreditsQueryConfiguration
) {
  return getMergedVolumes(freq, configuration, queryAggregatedCreditsByDates);
}
