import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import KlimaDAORetirementsByChainOverviewChart from "components/charts/KlimaDAORetirementsByChainOverviewChart";

/** Klima DAO Retirements by token Card */
export default function KlimaDAORetirementsByChainOverviewCard(
  props: CardProps
) {
  const chart = (
    /* @ts-expect-error async Server component */
    <KlimaDAORetirementsByChainOverviewChart></KlimaDAORetirementsByChainOverviewChart>
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
