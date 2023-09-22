import { t } from "@lingui/macro";
import { palette } from "theme/palette";
import ChartCard, { CardProps } from "../../ChartCard";

import KPieChart from "components/charts/helpers/KPieChart";
import { SimpleChartConfigurationFromType } from "lib/charts/aggregators";
import { queryAggregatedCredits } from "lib/charts/queries";

export default function CarbonSupplyByBlockChainCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <CarbonSupplyByBlockChainChart></CarbonSupplyByBlockChainChart>
  );

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
  const polygon = (
    await queryAggregatedCredits({ bridge: "polygon", status: "bridged" })
  ).quantity;
  const eth = (
    await queryAggregatedCredits({ bridge: "eth", status: "bridged" })
  ).quantity;
  const celo = (
    await queryAggregatedCredits({ bridge: "celo", status: "bridged" })
  ).quantity;

  const configuration: SimpleChartConfigurationFromType<
    "polygon" | "eth" | "celo"
  > = [
    {
      chartOptions: {
        id: "polygon",
        label: t`Polygon`,
        color: palette.charts.color1,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "eth",
        label: t`Ethereum`,
        color: palette.charts.color3,
        legendOrder: 2,
      },
    },
    {
      chartOptions: {
        id: "celo",
        label: t`Celo`,
        color: palette.charts.color5,
        legendOrder: 3,
      },
    },
  ];
  const data = [
    {
      quantity: polygon,
      id: "polygon",
    },
    {
      quantity: eth,
      id: "eth",
    },
    {
      quantity: celo,
      id: "celo",
    },
  ];
  return <KPieChart data={data} configuration={configuration} />;
}
