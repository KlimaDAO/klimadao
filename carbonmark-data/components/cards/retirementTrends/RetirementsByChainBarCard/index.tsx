import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import KBarChart from "components/charts/helpers/KBarChart";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { getMonthlyRetirementsByOriginInPercent } from "lib/charts/aggregators/getMonthlyRetirementsByOriginInPercent";
import { KlimaMonthlyRetirementsByOriginItem } from "lib/charts/types";
import { palette } from "theme/palette";

/** Klima DAO Retirements by pool Card */
export default function RetirementsByChainBarCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <RetirementsByChainBarChart />
  );

  return (
    <ChartCard
      {...props}
      title={t`KlimaDAO retirements by chain`}
      detailUrl="/details/retirement-trends-by-chain"
      chart={chart}
    />
  );
}
/** Async server component that renders a Recharts client component */
async function RetirementsByChainBarChart() {
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
  const data = await getMonthlyRetirementsByOriginInPercent(configuration);
  return (
    <KBarChart
      configuration={configuration}
      data={data}
      YAxis="percentage"
      dateField="retirement_date"
    />
  );
}
