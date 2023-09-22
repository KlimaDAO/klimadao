import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyEthCarbonSupplyChart } from "components/charts/DailyCarbonSupplyChart";

export default function EthCarbonSupplyCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DailyEthCarbonSupplyChart />
  );

  return (
    <ChartCard
      {...props}
      title={t`Ethereum supply`}
      detailUrl="/details/digital-carbon-supply/eth"
      chart={chart}
    />
  );
}
