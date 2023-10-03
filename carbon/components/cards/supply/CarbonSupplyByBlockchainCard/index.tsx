import { t } from "@lingui/macro";
import { palette } from "theme/palette";
import ChartCard, { CardProps } from "../../ChartCard";

import KPieChart from "components/charts/helpers/KPieChart";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { getLatestCarbonMetrics } from "lib/charts/aggregators/getCarbonMetrics";
import { CarbonMetricsItem } from "lib/charts/types";

export default function CarbonSupplyByBlockChainCard(props: CardProps) {
  const chart = <CarbonSupplyByBlockChainChart></CarbonSupplyByBlockChainChart>;

  return (
    <ChartCard
      {...props}
      title={t`Carbon supply by blockchain`}
      detailUrl="/details/digital-carbon-supply-by-blockchain"
      chart={chart}
    />
  );
}

/** Async server component that renders a Recharts client component */
async function CarbonSupplyByBlockChainChart() {
  const configuration: SimpleChartConfiguration<CarbonMetricsItem> = [
    {
      chartOptions: {
        id: "total_carbon_supply_polygon",
        label: t`Polygon`,
        color: palette.charts.color1,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "total_carbon_supply_eth",
        label: t`Ethereum`,
        color: palette.charts.color3,
        legendOrder: 2,
      },
    },
    {
      chartOptions: {
        id: "total_carbon_supply_celo",
        label: t`Celo`,
        color: palette.charts.color5,
        legendOrder: 3,
      },
    },
  ];
  const metrics = await getLatestCarbonMetrics();

  const data = [
    {
      quantity: metrics.total_carbon_supply_polygon,
      id: "total_carbon_supply_polygon",
    },
    {
      quantity: metrics.total_carbon_supply_eth,
      id: "total_carbon_supply_eth",
    },
    {
      quantity: metrics.total_carbon_supply_celo,
      id: "total_carbon_supply_celo",
    },
  ];
  return <KPieChart data={data} configuration={configuration} />;
}
