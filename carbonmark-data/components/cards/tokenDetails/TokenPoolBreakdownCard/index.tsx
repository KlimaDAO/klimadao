import { t } from "@lingui/macro";
import { creditsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import { palette } from "theme/palette";
import ChartCard, { CardProps } from "../../ChartCard";

import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import KPieChart from "components/charts/helpers/KPieChart";
import { SimpleChartConfigurationFromType } from "lib/charts/aggregators";
import { queryAggregatedCredits } from "lib/charts/queries";
import { capitalize } from "lodash";

export default function TokenPoolBreakdownCard(
  props: CardProps & TokenDetailsProps
) {
  // No methodologies card for retired credits on particular pools
  let chart = <></>;
  switch (props.bridge) {
    case "toucan":
      /* @ts-expect-error async Server component */
      chart = <TokenPoolBreakdownChartToucanChart {...props} />;
      break;
    case "c3":
      /* @ts-expect-error async Server component */
      chart = <TokenPoolBreakdownChartC3Chart {...props} />;
      break;
    default:
      return <></>;
  }

  return (
    <ChartCard
      {...props}
      title={t`Breakdown of ${capitalize(props.bridge)} pooled`}
      chart={chart}
    />
  );
}

/** Async server component that renders a Recharts client component */
async function TokenPoolBreakdownChartToucanChart(props: TokenDetailsProps) {
  const params = creditsQueryParamsFromProps(props, "bridged");
  const bct = (
    await queryAggregatedCredits({
      ...params,
      ...{ pool: "bct", bridge: "toucan" },
    })
  ).quantity;
  const nct = (
    await queryAggregatedCredits({
      ...params,
      ...{ pool: "nct", bridge: "toucan" },
    })
  ).quantity;
  const all = (
    await queryAggregatedCredits({
      ...params,
      ...{ pool: "all", bridge: "toucan" },
    })
  ).quantity;

  const not_pooled = all - (bct + nct);
  const configuration: SimpleChartConfigurationFromType<
    "bct" | "nct" | "not_pooled"
  > = [
    {
      chartOptions: {
        id: "bct",
        label: t`BCT`,
        color: palette.charts.color1,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "nct",
        label: t`NCT`,
        color: palette.charts.color3,
        legendOrder: 2,
      },
    },
    {
      chartOptions: {
        id: "not_pooled",
        label: t`Not pooled`,
        color: palette.charts.color5,
        legendOrder: 3,
      },
    },
  ];
  const data = [
    {
      quantity: bct,
      id: "nct",
    },
    {
      quantity: nct,
      id: "nct",
    },
    {
      quantity: not_pooled,
      id: "not_pooled",
    },
  ];

  return <KPieChart data={data} configuration={configuration} />;
}

/** Async server component that renders a Recharts client component */
async function TokenPoolBreakdownChartC3Chart(props: TokenDetailsProps) {
  const params = creditsQueryParamsFromProps(props, "bridged");
  const nbo = (
    await queryAggregatedCredits({
      ...params,
      ...{ pool: "nbo", bridge: "c3" },
    })
  ).quantity;
  const ubo = (
    await queryAggregatedCredits({
      ...params,
      ...{ pool: "ubo", bridge: "c3" },
    })
  ).quantity;
  const all = (
    await queryAggregatedCredits({
      ...params,
      ...{ pool: "all", bridge: "c3" },
    })
  ).quantity;

  const not_pooled = all - (nbo + ubo);
  const configuration: SimpleChartConfigurationFromType<
    "nbo" | "ubo" | "not_pooled"
  > = [
    {
      chartOptions: {
        id: "nbo",
        label: t`NBO`,
        color: palette.charts.color1,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "ubo",
        label: t`UBO`,
        color: palette.charts.color3,
        legendOrder: 2,
      },
    },
    {
      chartOptions: {
        id: "not_pooled",
        label: t`Not pooled`,
        color: palette.charts.color5,
        legendOrder: 3,
      },
    },
  ];
  const data = [
    {
      quantity: nbo,
      id: "nct",
    },
    {
      quantity: ubo,
      id: "nct",
    },
    {
      quantity: not_pooled,
      id: "not_pooled",
    },
  ];

  return <KPieChart data={data} configuration={configuration} />;
}
