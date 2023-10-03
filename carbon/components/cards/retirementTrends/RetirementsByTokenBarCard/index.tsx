import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import KBarChart from "components/charts/helpers/KBarChart";
import { getTokenCarbonMetricsInPercent } from "lib/charts/aggregators/getCarbonMetrics";
import { CarbonMetricsItem } from "lib/charts/types";
import { palette } from "theme/palette";

/** Klima DAO Retirements by pool Card */
export default function RetirementsByTokenBarCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <RetirementsByTokenBarChart />
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

/** Async server component that renders a Recharts client component */
async function RetirementsByTokenBarChart() {
  const configuration: ChartConfiguration<keyof CarbonMetricsItem> = [
    {
      id: "c3t_retired_polygon",
      label: "C3T",
      color: palette.charts.color1,
      legendOrder: 1,
    },
    {
      id: "tco2_retired_polygon",
      label: "TCO2",
      color: palette.charts.color3,
      legendOrder: 2,
    },
    {
      id: "mco2_retired_eth",
      label: "MCO2",
      color: palette.charts.color5,
      legendOrder: 3,
    },
  ];

  const data = await getTokenCarbonMetricsInPercent(configuration);
  return (
    <KBarChart
      configuration={configuration}
      data={data}
      YAxis="percentage"
      XAxis="months"
      dateField="date"
    />
  );
}
