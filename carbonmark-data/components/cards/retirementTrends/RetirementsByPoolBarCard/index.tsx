import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import RetirementsByPoolBarChart from "components/charts/RetirementsByPoolBarChart";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { KlimaMonthlyRetirementsByTokenItem } from "lib/charts/types";
import { palette } from "theme/palette";

/** Klima DAO Retirements by pool Card */
export default function RetirementsByPoolBarCard(props: CardProps) {
  const configuration: SimpleChartConfiguration<KlimaMonthlyRetirementsByTokenItem> =
    [
      {
        chartOptions: {
          id: "amount_retired_bct",
          label: "BCT",
          color: palette.charts.color1,
          legendOrder: 1,
        },
      },
      {
        chartOptions: {
          id: "amount_retired_nct",
          label: "NCT",
          color: palette.charts.color2,
          legendOrder: 2,
        },
      },
      {
        chartOptions: {
          id: "amount_retired_mco2",
          label: "MCO2",
          color: palette.charts.color3,
          legendOrder: 3,
        },
      },
      {
        chartOptions: {
          id: "amount_retired_ubo",
          label: "UBO",
          color: palette.charts.color4,
          legendOrder: 4,
        },
      },
      {
        chartOptions: {
          id: "amount_retired_nbo",
          label: "NBO",
          color: palette.charts.color5,
          legendOrder: 5,
        },
      },
    ];

  const chart = (
    /* @ts-expect-error async Server component */
    <RetirementsByPoolBarChart configuration={configuration} />
  );

  return (
    <ChartCard
      {...props}
      title={t`KlimaDAO retirements by pool`}
      detailUrl="/details/retirement-trends-by-pool"
      chart={chart}
    />
  );
}
