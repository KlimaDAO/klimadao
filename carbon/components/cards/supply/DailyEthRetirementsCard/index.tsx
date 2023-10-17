import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyEthCarbonRetirementsChart } from "components/charts/DailyCarbonRetirementsChart";

export default function DailyEthRetirementsCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DailyEthCarbonRetirementsChart />
  );
  return (
    <ChartCard
      {...props}
      title={t`Ethereum retirements`}
      detailUrl="/details/digital-carbon-retirements/eth"
      chart={chart}
    />
  );
}
