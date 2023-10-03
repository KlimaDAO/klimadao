import { ChartConfiguration } from "components/charts/helpers/Configuration";
import {
  AggregatedCreditsChartDataItem,
  Bridge,
  ChartMappingParams,
  CreditsQueryParams,
} from "lib/charts/types";
import { prepareAggregatedChartData } from "../helpers";
import { queryAggregatedCredits } from "../queries";

export type AggregatedCreditsChartConfiguration = ChartConfiguration<
  CreditsQueryParams,
  ChartMappingParams,
  Bridge
>;

/* Fetches multiple verra credits globally aggregated and merge them to be used in a chart */
export async function getAggregatedCredits(
  configuration: AggregatedCreditsChartConfiguration
) {
  return prepareAggregatedChartData<
    AggregatedCreditsChartDataItem,
    CreditsQueryParams
  >(configuration, (query) => {
    return queryAggregatedCredits({
      bridge: query.bridge,
      status: query.status,
    });
  });
}
