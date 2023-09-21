import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import RetirementsByTokenOverviewChart from "components/charts/RetirementsByTokenOverviewChart";

/** Klima DAO Retirements by token Card */
export default function RetirementsByTokenOverviewCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <RetirementsByTokenOverviewChart />
  );

  return (
    <ChartCard
      {...props}
      isColumnCard={true}
      title={t`Carbon token retirements`}
      chart={chart}
    />
  );
}
