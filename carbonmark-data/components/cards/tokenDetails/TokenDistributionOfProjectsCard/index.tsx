import { t } from "@lingui/macro";
import {
  TokenDetailsProps,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import CreditsDistributionOfProjectsChart from "components/charts/CreditsDistributionOfProjectsChart";
import ChartCard, { CardProps } from "../../ChartCard";

export default function TokenDistributionOfProjectsCard(
  props: CardProps & TokenDetailsProps
) {
  const chart = (
    /* @ts-expect-error async Server component */
    <CreditsDistributionOfProjectsChart {...props} />
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
