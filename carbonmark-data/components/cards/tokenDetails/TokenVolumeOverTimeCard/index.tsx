import { t } from "@lingui/macro";
import { poolsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import ChartCard, { CardProps } from "../../ChartCard";

import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import KBarChart from "components/charts/helpers/KBarChart";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { statusToDateField } from "lib/charts/dateField";
import { queryMonthlyAggregatedCreditsByPool } from "lib/charts/queries";
import { MonthlyAggregatedCreditsByPoolItem, Status } from "lib/charts/types";
import { palette } from "theme/palette";

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
  const params = poolsQueryParamsFromProps(props);
  const freq = props.since == "lifetime" ? "monthly" : "daily";
  const data = (await queryMonthlyAggregatedCreditsByPool(freq, params)).items;
  const configuration: SimpleChartConfiguration<MonthlyAggregatedCreditsByPoolItem> =
    [];
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "ubo")) {
    configuration.push({
      chartOptions: {
        id: "ubo_quantity",
        label: t`UBO`,
        color: palette.charts.color1,
        legendOrder: 1,
      },
    });
  }
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "ubo")) {
    configuration.push({
      chartOptions: {
        id: "nbo_quantity",
        label: t`NBO`,
        color: palette.charts.color5,
        legendOrder: 2,
      },
    });
  }
  if (
    props.bridge == "toucan" &&
    (props.pool == "all" || props.pool == "bct")
  ) {
    configuration.push({
      chartOptions: {
        id: "bct_quantity",
        label: t`BCT`,
        color: palette.charts.color1,
        legendOrder: 1,
      },
    });
  }
  if (
    props.bridge == "toucan" &&
    (props.pool == "all" || props.pool == "nct")
  ) {
    configuration.push({
      chartOptions: {
        id: "nct_quantity",
        label: t`NCT`,
        color: palette.charts.color5,
        legendOrder: 2,
      },
    });
  }
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
