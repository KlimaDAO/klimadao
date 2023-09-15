import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import KlimaDAORetirementsByChainBarChart from "components/charts/KlimaDAORetirementsByChainBarChart";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { CarbonMetricsItem } from "lib/charts/types";
import { palette } from "theme/palette";
/** Klima DAO Retirements by pool Card */
export default function KlimaDAORetirementsByChainBarCard(props: CardProps) {
  const configuration: SimpleChartConfiguration<CarbonMetricsItem> = [
    {
      chartOptions: {
        id: "c3t_retired_polygon",
        label: "C3T",
        color: palette.charts.color1,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "tco2_retired_polygon",
        label: "TCO2",
        color: palette.charts.color3,
        legendOrder: 2,
      },
    },
    {
      chartOptions: {
        id: "mco2_retired_eth",
        label: "MCO2",
        color: palette.charts.color5,
        legendOrder: 3,
      },
    },
  ];

  const chart = (
    /* @ts-expect-error async Server component */
    <KlimaDAORetirementsByChainBarChart configuration={configuration} />
  );

  return (
    <ChartCard
      {...props}
      title={t`KlimaDAO retirements by token`}
      detailUrl="/details/retirement-trends-by-token"
      chart={chart}
    />
  );
}
