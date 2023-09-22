import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyCarbonSupplyChart } from "components/charts/helpers/DailyCarbonSupplyChart";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { CarbonMetricsItem } from "lib/charts/types";
import { palette } from "theme/palette";
/** Verra Credits Card */
export default function DailyCarbonSupplyByProtocolCard(props: CardProps) {
  const configuration: SimpleChartConfiguration<CarbonMetricsItem> = [
    {
      chartOptions: {
        id: "total_toucan_supply",
        label: t`Toucan`,
        color: palette.charts.color5,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "total_moss_supply",
        label: "NCT",
        color: palette.charts.color3,
        legendOrder: 2,
      },
    },
    {
      chartOptions: {
        id: "total_c3_supply",
        label: "MCO2",
        color: palette.charts.color1,
        legendOrder: 3,
      },
    },
  ];

  const chart = (
    /* @ts-expect-error async Server component */
    <DailyCarbonSupplyChart configuration={configuration} />
  );

  return (
    <ChartCard
      {...props}
      title={t`Cummulative verra registry credits tokenized over time`}
      detailUrl="/details/digital-carbon-supply-snapshot"
      chart={chart}
    />
  );
}
