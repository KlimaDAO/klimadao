import { t } from "@lingui/macro";
import ChartCard from "components/cards/ChartCard";
import CreditsByBridgeChart from "components/charts/CreditsByBridgeChart";
import { AggregatedCreditsChartConfiguration } from "lib/charts/aggregators/getAggregatedCredits";
import { palette } from "theme/palette";

/** Verra Credits Card */
export default function TokenizedCreditsByBridgeCard() {
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
        legendOrder: 3,
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
        legendOrder: 3,
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

  const chart = (
    /* @ts-expect-error async Server component */
    <CreditsByBridgeChart configuration={configuration}></CreditsByBridgeChart>
  );
  return (
    <ChartCard
      title={t`Tokenized Credits By Bridge`}
      detailUrl="/details/verra-credits-tokenized-by-bridge"
      chart={chart}
    />
  );
}
