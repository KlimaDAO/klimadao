import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import KPieChart from "components/charts/helpers/KPieChart";
import {
  AggregatedCreditsChartConfiguration,
  getAggregatedCredits,
} from "lib/charts/aggregators/getAggregatedCredits";
import { palette } from "theme/palette";

/** Verra Credits Card */
export default function TokenizedCreditsByBridgeCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <TokenizedCreditsByBridgeChart showPercentageInLegend={props.isDetailPage} />
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
  showPercentageInLegend: boolean;
}) {
  const status = "bridged";
  const configuration: AggregatedCreditsChartConfiguration = [
    {
      query: {
        bridge: "toucan",
        status,
      },
      chartOptions: {
        id: "toucan",
        label: "Toucan",
        color: palette.charts.color5,
        legendOrder: 1,
      },
    },
    {
      query: {
        bridge: "moss",
        status,
      },
      chartOptions: {
        id: "moss",
        label: "Moss",
        color: palette.charts.color3,
        legendOrder: 2,
      },
    },
    {
      query: {
        bridge: "c3",
        status,
      },
      chartOptions: {
        id: "c3",
        label: "C3",
        color: palette.charts.color1,
        legendOrder: 3,
      },
    },
  ];
  const data = await getAggregatedCredits(configuration);

  return (
    <KPieChart
      data={data}
      configuration={configuration}
      showPercentageInLegend={props.showPercentageInLegend}
    />
  );
}
