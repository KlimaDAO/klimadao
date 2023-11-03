import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyEthCarbonRetirementsChart } from "components/charts/DailyCarbonRetirementsChart";
import { PageLinks } from "lib/PageLinks";

export default function DailyEthRetirementsCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DailyEthCarbonRetirementsChart />
  );
  return (
    <ChartCard
      {...props}
      title={t`Ethereum retirements`}
      detailUrl={`${PageLinks.Supply}/digital-carbon-retirements/eth`}
      chart={chart}
    />
  );
}
