import { queryAggregatedPoolVolumesByDates } from "lib/charts/queries";
import {
  DailyCreditsQueryConfiguration,
  DateAggregationFrequency,
} from "lib/charts/types";
import { getMergedVolumes } from "../helpers";

/* Fetches multiple pool volumes aggregated by dates and merge them to be used in a chart */
export async function getMergedPoolVolumesbyDate(
  freq: DateAggregationFrequency,
  configuration: DailyCreditsQueryConfiguration
) {
  return getMergedVolumes(
    freq,
    configuration,
    queryAggregatedPoolVolumesByDates
  );
}
