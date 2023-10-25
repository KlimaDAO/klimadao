import { getAggregatedCreditsByProject } from "lib/charts/aggregators/getAggregatedCredits";
import KTreeMap, { TreemapTooltipConfiguration } from "../helpers/KTreeMap";

import ChartWrapper from "../helpers/ChartWrapper";
import { CreditsFilteringProps } from "../helpers/props";
/** Async server component that renders a Recharts client component */
export default async function CreditsDistributionOfProjectsChart(
  props: CreditsFilteringProps
) {
  const data = await getAggregatedCreditsByProject(props);
  let tooltipConfiguration: TreemapTooltipConfiguration = "issued";
  if (props.status == "retired" || props.status == "all_retired")
    tooltipConfiguration = "retired";

  return (
    <ChartWrapper data={data}>
      <KTreeMap
        data={data}
        dataKey="total_quantity"
        tooltipConfiguration={tooltipConfiguration}
      />
    </ChartWrapper>
  );
}
