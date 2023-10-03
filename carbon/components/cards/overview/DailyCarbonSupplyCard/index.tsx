import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import {
  DailyCeloCarbonSupplyChart,
  DailyEthCarbonSupplyChart,
  DailyPolygonCarbonSupplyChart,
} from "components/charts/DailyCarbonSupplyChart";
import { getChainsOptions } from "lib/charts/options";
import { NodeDictionnary } from "lib/charts/types";
/** Verra Credits Card */
export default function DailyCarbonSupplyOverviewCard(props: CardProps) {
  const charts: NodeDictionnary = {
    polygon: <DailyPolygonCarbonSupplyChart />,

    eth: <DailyEthCarbonSupplyChart />,

    celo: <DailyCeloCarbonSupplyChart />,
  };
  return (
    <ChartCard
      {...props}
      title={t`Supply`}
      detailUrl="/details/digital-carbon-supply-snapshot"
      bottomOptions={getChainsOptions()}
      charts={charts}
    />
  );
}
