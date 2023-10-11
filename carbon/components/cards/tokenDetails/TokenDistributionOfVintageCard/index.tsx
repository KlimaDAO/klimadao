import { t } from "@lingui/macro";
import { creditsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import ChartCard, { CardProps } from "../../ChartCard";

import {
  TokenDetailsProps,
  getChartConfiguration,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import KBarChart from "components/charts/helpers/KBarChart";
import { queryAggregatedCreditsByPoolAndVintage } from "lib/charts/queries";

export default function TokenDistributionOfVintageCard(
  props: CardProps & TokenDetailsProps
) {
  // No vintage card for retired credits on particular pools
  if (props.pool != "all" && props.status != "retired") {
    return <></>;
  }
  const chart = (
    /* @ts-expect-error async Server component */
    <TokenDistributionOfVintageChart {...props} />
  );

  return (
    <ChartCard
      {...props}
      title={t`Distribution of vintage start dates`}
      detailUrl={propsToDetailsURL(props, "token-by-vintage-date")}
      chart={chart}
    />
  );
}

/** Async server component that renders a Recharts client component */
async function TokenDistributionOfVintageChart(props: TokenDetailsProps) {
  const params = creditsQueryParamsFromProps(props);
  const data = (await queryAggregatedCreditsByPoolAndVintage(params)).items;
  const configuration = getChartConfiguration(props);
  return (
    <KBarChart
      data={data}
      configuration={configuration}
      dateField="vintage"
      XAxis="vintage"
      YAxis="tons"
    />
  );
}
