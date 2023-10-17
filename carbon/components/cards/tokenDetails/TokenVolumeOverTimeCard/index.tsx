import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "../../ChartCard";

import {
  TokenDetailsProps,
  getChartConfiguration,
  getCreditsQueryConfiguration,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import KBarChart from "components/charts/helpers/KBarChart";
import { getMergedCreditsByDate } from "lib/charts/aggregators/getDailyCredits";
export default function TokenVolumeOverTimeCard(
  props: CardProps & TokenDetailsProps
) {
  const chart = (
    /* @ts-expect-error async Server component */
    <TokenVolumeOverTimeChart {...props} />
  );

  return (
    <ChartCard
      {...props}
      title={t`Volume over time`}
      chart={chart}
      detailUrl={propsToDetailsURL(props, "token-volume-over-time")}
    />
  );
}
/** Async server component that renders a Recharts client component */
async function TokenVolumeOverTimeChart(props: TokenDetailsProps) {
  const chartConfiguration = getChartConfiguration(props);
  const queryConfiguration = getCreditsQueryConfiguration(props);
  const freq = props.since == "lifetime" ? "monthly" : "daily";
  const data = await getMergedCreditsByDate(freq, queryConfiguration);
  // Hack: We must modify data to add not pooled quantity value
  if (props.pool == "all") {
    data.forEach((item) => {
      if (props.bridge == "toucan")
        item.not_pooled_quantity =
          item.total_quantity - (item.nct_quantity + item.bct_quantity);
      if (props.bridge == "c3")
        item.not_pooled_quantity =
          item.total_quantity - (item.ubo_quantity + item.nbo_quantity);
    });
  }
  const XAxis = freq == "monthly" ? "months" : "days";
  return (
    <KBarChart
      data={data}
      configuration={chartConfiguration}
      dateField="date"
      XAxis={XAxis}
      YAxis="tons"
    />
  );
}
