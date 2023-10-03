import { ChartConfiguration } from "components/charts/helpers/Configuration";
import { Bridge, KlimaMonthlyRetirementsByTokenItem } from "lib/charts/types";
import { transformToPercentages } from "../helpers";
import { queryKlimaMonthlyRetirementsByPool } from "../queries";

export type AggregatedCreditsChartConfiguration = ChartConfiguration<Bridge>;

/* Fetches query retirements information and transform quantities into percentages to be used in a chart */
export async function getKlimaMonthlyRetirementsByPoolInPercent(
  configuration: ChartConfiguration<keyof KlimaMonthlyRetirementsByTokenItem>
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
