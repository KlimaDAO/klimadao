import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "../../ChartCard";

import {
  TokenDetailsProps,
  getChartConfiguration,
  getCreditsQueryConfiguration,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import KAreaChart from "components/charts/helpers/KAreaChart";
import { getMergedPoolVolumesbyDate } from "lib/charts/aggregators/getDailyPoolVolumes";
import { cumulativeSum } from "lib/charts/helpers";
export default function PoolVolumeOverTimeCard(
  props: CardProps & TokenDetailsProps
) {
  if (props.pool == "all") {
    return <></>;
  }

  const chart = (
    /* @ts-expect-error async Server component */
    <PoolVolumeOverTimeChart {...props} status={props.status} />
  );
  const title =
    props.status == "deposited"
      ? t`Volume deposited over time`
      : props.status == "retired"
      ? t`Volume retired over time`
      : props.status == "redeemed"
      ? t`Volume redemmed over time`
      : "";

  const detailPageSlug = `pool-volume-${props.status}-over-time`;
  return (
    <ChartCard
      {...props}
      title={title}
      chart={chart}
      detailUrl={propsToDetailsURL(props, detailPageSlug)}
    />
  );
}
/** Async server component that renders a Recharts client component */
async function PoolVolumeOverTimeChart(props: TokenDetailsProps) {
  const chartConfiguration = getChartConfiguration(props);
  const queryConfiguration = getCreditsQueryConfiguration(props);
  const freq = props.since == "lifetime" ? "monthly" : "daily";
  let data = await getMergedPoolVolumesbyDate(freq, queryConfiguration);
  data = cumulativeSum(data, chartConfiguration);

  const XAxis = freq == "monthly" ? "months" : "days";
  return (
    <KAreaChart
      data={data}
      configuration={chartConfiguration}
      dateField="date"
      XAxis={XAxis}
      YAxis="tons"
    />
  );
}
