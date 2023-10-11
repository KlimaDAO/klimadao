import { t } from "@lingui/macro";
import { creditsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import ChartCard, { CardProps } from "../../ChartCard";

import {
  TokenDetailsProps,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import KBarChart from "components/charts/helpers/KBarChart";
import { statusToDateField } from "lib/charts/dateField";
import { fillWithZeroes } from "lib/charts/helpers";
import { queryAggregatedCreditsByDates } from "lib/charts/queries";
import { AggregatedCreditsByDatesItem, Status } from "lib/charts/types";
import { palette } from "theme/palette";

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
  const configuration: ChartConfiguration<keyof AggregatedCreditsByDatesItem> =
    [
      {
        id: "quantity",
        label: t`Quantity`,
        color: palette.charts.color3,
        legendOrder: 1,
      },
    ];
  let data = (
    await queryAggregatedCreditsByDates(freq, {
      ...params,
    })
  ).items;

  data = fillWithZeroes(
    data,
    configuration,
    statusToDateField(props.status),
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
