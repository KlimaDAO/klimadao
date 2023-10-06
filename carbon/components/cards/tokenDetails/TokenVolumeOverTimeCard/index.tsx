import { t } from "@lingui/macro";
import { creditsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import ChartCard, { CardProps } from "../../ChartCard";

import {
  TokenDetailsProps,
  getChartConfiguration,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import KBarChart from "components/charts/helpers/KBarChart";
import { statusToDateField } from "lib/charts/dateField";
import { fillWithZeroes } from "lib/charts/helpers";
import { queryAggregatedCreditsByPoolAndDates } from "lib/charts/queries";
import { Status } from "lib/charts/types";

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
  const params = creditsQueryParamsFromProps(props);
  const freq = props.since == "lifetime" ? "monthly" : "daily";
  const configuration = getChartConfiguration(props);
  let data = (
    await queryAggregatedCreditsByPoolAndDates(freq, {
      ...params,
    })
  ).items;

  data = fillWithZeroes(
    data,
    configuration,
    "bridged_date",
    props.since == "lifetime" ? "M" : "d"
  );
  const XAxis = props.since == "lifetime" ? "months" : "days";
  const dateField = statusToDateField(params.status as Status);
  return (
    <KBarChart
      data={data}
      configuration={configuration}
      dateField={dateField}
      XAxis={XAxis}
      YAxis="tons"
    />
  );
}
