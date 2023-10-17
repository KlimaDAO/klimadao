import { t } from "@lingui/macro";
import { creditsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCredits";
import ChartCard, { CardProps } from "../../ChartCard";

import {
  TokenDetailsProps,
  getChartConfiguration,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import KBarChart from "components/charts/helpers/KBarChart";
import { queryAggregatedCreditsByPoolAndMethodology } from "lib/charts/queries";

export default function TokenDistributionOfMethodologiesCard(
  props: CardProps & TokenDetailsProps
) {
  // No methodologies card for retired credits on particular pools
  /*
  if (props.pool != "all" && props.status == "retired") {
    return <></>;
  }*/
  const chart = (
    /* @ts-expect-error async Server component */
    <TokenDistributionOfMethodologiesChart {...props} />
  );

  return (
    <ChartCard
      {...props}
      title={t`Distribution of methodologies`}
      chart={chart}
      detailUrl={propsToDetailsURL(props, "token-by-methodologies")}
    />
  );
}

/** Async server component that renders a Recharts client component */
async function TokenDistributionOfMethodologiesChart(props: TokenDetailsProps) {
  const params = creditsQueryParamsFromProps(props);
  const data = (await queryAggregatedCreditsByPoolAndMethodology(params)).items;
  const configuration = getChartConfiguration(props);
  return (
    <KBarChart
      data={data}
      configuration={configuration}
      dateField="methodology"
      XAxis="methodology"
      YAxis="tons"
    />
  );
}
