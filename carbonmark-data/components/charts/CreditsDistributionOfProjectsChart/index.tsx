import { getAggregatedCreditsByProjects } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import Chart from "./Chart";

import NoDataChartWrapper from "components/charts/helpers/NoDataChartWrapper";
import { CreditsFilteringProps } from "../helpers/props";

/** Async server component that renders a Recharts client component */
export default async function CreditsDistributionOfProjectsChart(
  props: CreditsFilteringProps
) {
  const data = await getAggregatedCreditsByProjects(props);
  return (
    <NoDataChartWrapper data={data}>
      <Chart data={data} />
    </NoDataChartWrapper>
  );
}
