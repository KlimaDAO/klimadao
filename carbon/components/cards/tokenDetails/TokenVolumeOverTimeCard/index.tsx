import { t } from "@lingui/macro";
import { creditsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import ChartCard, { CardProps } from "../../ChartCard";

import {
  TokenDetailsProps,
  getChartConfiguration,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import KAreaChart from "components/charts/helpers/KAreaChart";
import { statusToDateField } from "lib/charts/dateField";
import { cumulativeSum, fillMonthsWithZeroes } from "lib/charts/helpers";
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
      ...{ operator: "cumsum" },
    })
  ).items;
  data = fillMonthsWithZeroes(data, "bridged_date", configuration);
  data = cumulativeSum(data, configuration);
  const XAxis = props.since == "lifetime" ? "months" : "days";
  const dateField = statusToDateField(params.status as Status);
  return (
    <KAreaChart
      data={data}
      configuration={configuration}
      dateField={dateField}
      XAxis={XAxis}
    />
  );
}
