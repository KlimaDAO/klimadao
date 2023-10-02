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
      sort_order: "desc",
      page_size: 24,
    })
  ).items;
  data.sort((item1, item2) => {
    return item1.retirement_date > item2.retirement_date ? 1 : -1;
  });
  return transformToPercentages(data, configuration);
}
