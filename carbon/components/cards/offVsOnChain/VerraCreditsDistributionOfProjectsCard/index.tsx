import { t } from "@lingui/macro";
import DistributionOfProjectsChart from "components/charts/DistributionOfProjectsChart";
import { CreditsFilteringProps } from "components/charts/helpers/props";
import { getAggregatedCreditsByBridgeAndProject } from "lib/charts/aggregators/getAggregatedCredits";
import ChartCard, { CardProps } from "../../ChartCard";
import { OffVsOnChainProps } from "../helpers";

export default function VerraCreditsDistributionOfProjectsCard(
  props: CardProps & OffVsOnChainProps
) {
  const params: CreditsFilteringProps = {
    bridge: "offchain",
    pool: "all",
    status: props.status,
    since: "lifetime",
  };
  const chart = (
    /* @ts-expect-error async Server component */
    <VerraCreditsDistributionOfProjectsChart {...params} />
  );
  const detailUrl =
    props.status == "issued"
      ? "/details/verra-credits-issued-by-project-type"
      : "/details/verra-credits-retired-by-project-type";

  return (
    <ChartCard
      {...props}
      title={t`Credits by project type`}
      chart={chart}
      detailUrl={detailUrl}
      className={props.className}
    />
  );
}

/** Async server component that renders a Recharts client component */
async function VerraCreditsDistributionOfProjectsChart(
  props: CreditsFilteringProps
) {
  const data = await getAggregatedCreditsByBridgeAndProject(props);
  return (
    <DistributionOfProjectsChart
      {...props}
      data={data}
      dataKey="total_quantity"
    />
  );
}
