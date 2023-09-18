import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import RetirementsByChainBarChart from "components/charts/RetirementsByChainBarChart";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { KlimaMonthlyRetirementsByOriginItem } from "lib/charts/types";
import { palette } from "theme/palette";
/** Klima DAO Retirements by pool Card */
export default function RetirementsByChainBarCard(props: CardProps) {
  const configuration: SimpleChartConfiguration<KlimaMonthlyRetirementsByOriginItem> =
    [
      {
        chartOptions: {
          id: "amount_retired_offchain",
          label: t`Off-chain`,
          color: palette.charts.color1,
          legendOrder: 1,
        },
      },
      {
        chartOptions: {
          id: "amount_retired_klima",
          label: t`On-chain`,
          color: palette.charts.color3,
          legendOrder: 2,
        },
      },
    ];

  const chart = (
    /* @ts-expect-error async Server component */
    <RetirementsByChainBarChart configuration={configuration} />
  );

  return (
    <ChartCard
      {...props}
      title={t`KlimaDAO retirements by chain`}
      detailUrl="/details/retirement-trends-by-token"
      chart={chart}
    />
  );
}
