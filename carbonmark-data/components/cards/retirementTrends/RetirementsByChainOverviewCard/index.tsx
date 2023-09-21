import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import RetirementsByChainOverviewChart from "components/charts/RetirementsByChainOverviewChart";

/** Klima DAO Retirements by token Card */
export default function RetirementsByChainOverviewCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <RetirementsByChainOverviewChart />
  );

  return (
    <ChartCard
      {...props}
      isColumnCard={true}
      title={t`Carbon retirements`}
      chart={chart}
    />
  );
}
