import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyCeloCarbonSupplyChart } from "components/charts/DailyCarbonSupplyChart";

export default function DailyCeloCarbonSupplyCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DailyCeloCarbonSupplyChart />
  );

  return (
    <ChartCard
      {...props}
      title={t`Celo supply`}
      detailUrl="/details/digital-carbon-supply/celo"
      chart={chart}
    />
  );
}
