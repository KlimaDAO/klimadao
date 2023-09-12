import { getAggregatedCreditsByProjects } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import Chart from "./Chart";

import { CreditsQueryParams } from "lib/charts/types";

/** Async server component that renders a Recharts client component */
export default async function TokenDistributionOfProjectsChart(
  props: CreditsQueryParams
) {
  const data = await getAggregatedCreditsByProjects(props);
  return <Chart data={data} />;
}
