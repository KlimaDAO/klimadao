import { t } from "@lingui/macro";
import { creditsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import ChartCard, { CardProps } from "../../ChartCard";

import {
  TokenDetailsProps,
  getChartConfiguration,
} from "components/cards/tokenDetails/helpers";
import KBarChart from "components/charts/helpers/KBarChart";
import { statusToDateField } from "lib/charts/dateField";
import { queryAggregatedCreditsByPoolAndDates } from "lib/charts/queries";
import { Status } from "lib/charts/types";

export default function TokenVolumeOverTimeCard(
  props: CardProps & TokenDetailsProps
) {
  const chart = (
    /* @ts-expect-error async Server component */
    <TokenVolumeOverTimeChart {...props} />
  );

  return <ChartCard {...props} title={t`Volume over time`} chart={chart} />;
}

/** Async server component that renders a Recharts client component */
async function TokenVolumeOverTimeChart(props: TokenDetailsProps) {
  const params = creditsQueryParamsFromProps(props);
  const freq = props.since == "lifetime" ? "monthly" : "daily";
  const data = (await queryAggregatedCreditsByPoolAndDates(freq, params)).items;
  const configuration = getChartConfiguration(props);
  const XAxis = props.since == "lifetime" ? "months" : "days";
  const dateField = statusToDateField(params.status as Status);

  return (
    <KBarChart
      data={data}
      configuration={configuration}
      dateField={dateField}
      XAxis={XAxis}
    />
  );
}
