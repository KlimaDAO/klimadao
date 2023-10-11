import { getAggregatedCreditsByProject } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import Chart from "./Chart";

import ChartWrapper from "../helpers/ChartWrapper";
import { CreditsFilteringProps } from "../helpers/props";
/** Async server component that renders a Recharts client component */
export default async function CreditsDistributionOfProjectsChart(
  props: CreditsFilteringProps
) {
  const data = await getAggregatedCreditsByProject(props);
  return (
    <ChartWrapper data={data}>
      <Chart data={data} />
    </ChartWrapper>
  );
}
