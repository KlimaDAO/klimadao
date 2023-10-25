import { t } from "@lingui/macro";
import {
  TokenDetailsProps,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import DistributionOfProjectsChart from "components/charts/DistributionOfProjectsChart";
import { CreditsFilteringProps } from "components/charts/helpers/props";
import { getAggregatedCreditsByPoolAndProject } from "lib/charts/aggregators/getAggregatedCredits";
import ChartCard, { CardProps } from "../../ChartCard";

export default function TokenDistributionOfProjectsCard(
  props: CardProps & TokenDetailsProps
) {
  const chart = (
    /* @ts-expect-error async Server component */
    <TokenDistributionOfProjectsChart {...props} />
  );

  return (
    <ChartCard
      {...props}
      title={t`Distribution of Projects`}
      chart={chart}
      detailUrl={propsToDetailsURL(props, "token-by-projects")}
    />
  );
}

/** Async server component that renders a Recharts client component */
async function TokenDistributionOfProjectsChart(props: CreditsFilteringProps) {
  const data = await getAggregatedCreditsByPoolAndProject(props);
  return (
    <DistributionOfProjectsChart
      {...props}
      data={data}
      dataKey="total_quantity"
    />
  );
}
