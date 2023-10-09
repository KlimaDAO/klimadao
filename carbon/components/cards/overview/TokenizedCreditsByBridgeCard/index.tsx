import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import KPieChart from "components/charts/helpers/KPieChart";
import { AggregatedCreditsChartConfiguration } from "lib/charts/aggregators/getAggregatedCredits";
import { queryAggregatedCreditsByBridge } from "lib/charts/queries";
import { palette } from "theme/palette";

/** Verra Credits Card */
export default function TokenizedCreditsByBridgeCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
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

  const data = await queryAggregatedCreditsByBridge();
  const chartData = [
    { id: "toucan", quantity: data.toucan_quantity },
    { id: "moss", quantity: data.moss_quantity },
    { id: "c3", quantity: data.c3_quantity },
  ];

  return (
    <KPieChart
      data={chartData}
      configuration={chartConfiguration}
      showPercentageInLegend={props.showPercentageInLegend}
      YAxis="tons"
    />
  );
}
