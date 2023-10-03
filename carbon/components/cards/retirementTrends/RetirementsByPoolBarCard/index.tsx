import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import KBarChart from "components/charts/helpers/KBarChart";
import { getKlimaMonthlyRetirementsByPoolInPercent } from "lib/charts/aggregators/getKlimaMonthlyRetirementsByPoolInPercent";
import { KlimaMonthlyRetirementsByTokenItem } from "lib/charts/types";
import { palette } from "theme/palette";

/** Klima DAO Retirements by pool Card */
export default function RetirementsByPoolBarCard(props: CardProps) {
  const chart = <RetirementsByPoolBarChart />;

  return (
    <ChartCard
      {...props}
      title={t`KlimaDAO retirements by pool`}
      detailUrl="/details/retirement-trends-by-pool"
      chart={chart}
    />
  );
}

/** Async server component that renders a Recharts client component */
async function RetirementsByPoolBarChart() {
  const configuration: ChartConfiguration<
    keyof KlimaMonthlyRetirementsByTokenItem
  > = [
    {
      id: "amount_retired_bct",
      label: "BCT",
      color: palette.charts.color1,
      legendOrder: 1,
    },
    {
      id: "amount_retired_nct",
      label: "NCT",
      color: palette.charts.color2,
      legendOrder: 2,
    },
    {
      id: "amount_retired_mco2",
      label: "MCO2",
      color: palette.charts.color3,
      legendOrder: 3,
    },
    {
      id: "amount_retired_ubo",
      label: "UBO",
      color: palette.charts.color4,
      legendOrder: 4,
    },
    {
      id: "amount_retired_nbo",
      label: "NBO",
      color: palette.charts.color5,
      legendOrder: 5,
    },
  ];
  const data = await getKlimaMonthlyRetirementsByPoolInPercent(configuration);
  return (
    <KBarChart
      configuration={configuration}
      data={data}
      YAxis="percentage"
      XAxis="months"
      dateField="retirement_date"
    />
  );
}
