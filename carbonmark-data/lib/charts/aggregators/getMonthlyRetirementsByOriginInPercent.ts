import { KlimaMonthlyRetirementsByOriginItem } from "lib/charts/types";
import { SimpleChartConfiguration } from ".";
import { transformToPercentages } from "../helpers";
import { queryMonthlyRetirementsByOrigin } from "../queries";

/* Fetches query retirements information and transform quantities into percentages to be used in a chart */
export async function getMonthlyRetirementsByOriginInPercent(
  configuration: SimpleChartConfiguration<KlimaMonthlyRetirementsByOriginItem>
) {
  const data = (
    await queryMonthlyRetirementsByOrigin({
      sort_by: "retirement_date",
      sort_order: "asc",
      page_size: -1,
    })
  ).items;
  return transformToPercentages(data, configuration);
}
