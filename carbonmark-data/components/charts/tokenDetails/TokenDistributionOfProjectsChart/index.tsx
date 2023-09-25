import { getAggregatedCreditsByProjects } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import Chart from "./Chart";

import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import NoDataChartWrapper from "components/charts/helpers/NoDataChartWrapper";

/** Async server component that renders a Recharts client component */
export default async function TokenDistributionOfProjectsChart(
  props: TokenDetailsProps
) {
  const data = await getAggregatedCreditsByProjects(props);
  return (
    <NoDataChartWrapper data={data}>
      <Chart data={data} />
    </NoDataChartWrapper>
  );
}
