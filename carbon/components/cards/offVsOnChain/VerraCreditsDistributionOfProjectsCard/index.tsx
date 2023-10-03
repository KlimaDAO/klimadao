import { t } from "@lingui/macro";
import CreditsDistributionOfProjectsChart from "components/charts/CreditsDistributionOfProjectsChart";
import { CreditsFilteringProps } from "components/charts/helpers/props";
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
  const chart = <CreditsDistributionOfProjectsChart {...params} />;
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
    />
  );
}
