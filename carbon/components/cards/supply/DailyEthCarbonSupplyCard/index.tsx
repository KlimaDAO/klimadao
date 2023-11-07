import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyEthCarbonSupplyChart } from "components/charts/DailyCarbonSupplyChart";
import { PageLinks } from "lib/PageLinks";

export default function DailyEthCarbonSupplyCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DailyEthCarbonSupplyChart />
  );

  return (
    <ChartCard
      {...props}
      title={t`Ethereum supply`}
      detailUrl={`${PageLinks.Supply}/digital-carbon-supply/eth`}
      chart={chart}
    />
  );
}
