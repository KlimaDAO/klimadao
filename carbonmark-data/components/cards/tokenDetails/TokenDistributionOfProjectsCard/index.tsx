import { t } from "@lingui/macro";
import {
  TokenDetailsProps,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import TokenDistributionOfProjectsChart from "components/charts/tokenDetails/TokenDistributionOfProjectsChart";
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
