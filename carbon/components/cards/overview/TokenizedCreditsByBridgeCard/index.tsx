import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import KPieChart from "components/charts/helpers/KPieChart";
import {
  AggregatedCreditsChartConfiguration,
  AggregatedCreditsQueryConfiguration,
  getAggregatedCredits,
} from "lib/charts/aggregators/getAggregatedCredits";
import { palette } from "theme/palette";

/** Verra Credits Card */
export default function TokenizedCreditsByBridgeCard(props: CardProps) {
  const chart = (
    <TokenizedCreditsByBridgeChart
      showPercentageInLegend={props.isDetailPage}
    />
  );
  return (
    <ChartCard
      {...props}
      title={t`Tokenized credits by bridge`}
      detailUrl="/details/verra-credits-tokenized-by-bridge"
      chart={chart}
    />
  );
}

/** Async server component that renders a Recharts client component */
async function TokenizedCreditsByBridgeChart(props: {
  showPercentageInLegend?: boolean;
}) {
  const status = "bridged";
  const chartConfiguration: AggregatedCreditsChartConfiguration = [
    {
      id: "toucan",
      label: "Toucan",
      color: palette.charts.color5,
      legendOrder: 1,
    },
    {
      id: "moss",
      label: "Moss",
      color: palette.charts.color3,
      legendOrder: 2,
    },
    {
      id: "c3",
      label: "C3",
      color: palette.charts.color1,
      legendOrder: 3,
    },
  ];
  const queryConfiguration: AggregatedCreditsQueryConfiguration = [
    {
      query: {
        bridge: "toucan",
        status,
      },
    },
    {
      query: {
        bridge: "moss",
        status,
      },
    },
    {
      query: {
        bridge: "c3",
        status,
      },
    },
  ];
  const data = await getAggregatedCredits(queryConfiguration);

  return (
    <KPieChart
      data={data}
      configuration={chartConfiguration}
      showPercentageInLegend={props.showPercentageInLegend}
      YAxis="tons"
    />
  );
}
