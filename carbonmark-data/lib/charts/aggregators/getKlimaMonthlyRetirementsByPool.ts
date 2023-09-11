import { ChartConfiguration } from "components/charts/helpers/Configuration";
import {
  Bridge,
  ChartMappingParams,
  CreditsQueryParams,
  KlimaMonthlyRetirementsItem,
} from "lib/charts/types";
import { SimpleChartConfiguration } from ".";
import { transformToPercentages } from "../helpers";
import { queryKlimaMonthlyRetirementsByPool } from "../queries";

export type AggregatedCreditsChartConfiguration = ChartConfiguration<
  CreditsQueryParams,
  ChartMappingParams,
  Bridge
>;

/* Fetches multiple verra credits globally aggregated and merge them to be used in a chart */
export async function getKlimaMonthlyRetirementsByPool(
  configuration: SimpleChartConfiguration<KlimaMonthlyRetirementsItem>
) {
  const data = (
    await queryKlimaMonthlyRetirementsByPool({
      sort_by: "retirement_date",
      sort_order: "asc",
      page_size: -1,
    })
  ).items;
  return transformToPercentages(data, configuration);
}
