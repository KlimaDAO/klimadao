import { getAggregatedCreditsByProjects } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import Chart from "./Chart";

import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";

/** Async server component that renders a Recharts client component */
export default async function TokenDistributionOfProjectsChart(
  props: TokenDetailsProps
) {
  const data = await getAggregatedCreditsByProjects(props);
  return <Chart data={data} />;
}
