import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyEthCarbonRetirementsChart } from "components/charts/DailyCarbonRetirementsChart";

export default function DailyEthRetirementsCard(props: CardProps) {
  const chart = <DailyEthCarbonRetirementsChart />;
  return (
    <ChartCard
      {...props}
      title={t`Ethereum retirements`}
      detailUrl="/details/digital-carbon-retirements/eth"
      chart={chart}
    />
  );
}
