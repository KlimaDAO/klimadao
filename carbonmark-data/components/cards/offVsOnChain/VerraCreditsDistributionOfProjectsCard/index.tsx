import { t } from "@lingui/macro";
import CreditsDistributionOfProjectsChart from "components/charts/CreditsDistributionOfProjectsChart";
import { CreditsFilteringProps } from "components/charts/helpers/props";
import ChartCard, { CardProps } from "../../ChartCard";
import { OffVsOnChainProps } from "../herlpers";

export default function VerraCreditsDistributionOfProjectsCard(
  props: CardProps & OffVsOnChainProps
) {
  const params: CreditsFilteringProps = {
    bridge: "offchain",
    pool: "all",
    status: "issued",
    since: "lifetime",
  };
  const chart = (
    /* @ts-expect-error async Server component */
    <CreditsDistributionOfProjectsChart {...params} />
  );

  return (
    <ChartCard {...props} title={t`Credits by project type`} chart={chart} />
  );
}
