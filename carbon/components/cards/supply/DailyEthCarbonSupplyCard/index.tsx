import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyEthCarbonSupplyChart } from "components/charts/DailyCarbonSupplyChart";

export default function DailyEthCarbonSupplyCard(props: CardProps) {
  const chart = <DailyEthCarbonSupplyChart />;

  return (
    <ChartCard
      {...props}
      title={t`Ethereum supply`}
      detailUrl="/details/digital-carbon-supply/eth"
      chart={chart}
    />
  );
}
