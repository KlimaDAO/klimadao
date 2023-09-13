import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import KlimaDAORetirementsByPoolOverviewChart from "components/charts/KlimaDAORetirementsByPoolOverviewChart";

/** Klima DAO Retirements by pool Card */
export default function KlimaDAORetirementsByPoolOverviewCard(
  props: CardProps
) {
  const chart = (
    /* @ts-expect-error async Server component */
    <KlimaDAORetirementsByPoolOverviewChart></KlimaDAORetirementsByPoolOverviewChart>
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
