import { t } from "@lingui/macro";
import TokenDistributionOfProjectsChart from "components/charts/TokenDistributionOfProjectsChart";
import { CreditsQueryParams } from "lib/charts/types";
import ChartCard, { CardProps } from "../ChartCard";

export default function TokenDistributionOfProjectsCard(props: CardProps & CreditsQueryParams) {
  /* @ts-expect-error async Server component */
  const chart = <TokenDistributionOfProjectsChart 
  bridge={props.bridge}
  pool={props.pool}
  status={props.status}
  ></TokenDistributionOfProjectsChart>;

  return (
    <ChartCard
      {...props}
      title={t`Distribution of Projects`}
      chart={chart}
    />
  );
}
