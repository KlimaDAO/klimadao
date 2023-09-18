import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import RetirementsByPoolOverviewChart from "components/charts/RetirementsByPoolOverviewChart";

/** Klima DAO Retirements by pool Card */
export default function RetirementsByPoolOverviewCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <RetirementsByPoolOverviewChart />
  );

  return (
    <ChartCard
      {...props}
      isColumnCard={true}
      title={t`Carbon pool redemptions / retirements`}
      chart={chart}
    />
  );
}
