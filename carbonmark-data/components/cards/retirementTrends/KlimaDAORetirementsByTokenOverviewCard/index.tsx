import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import KlimaDAORetirementsByTokenOverviewChart from "components/charts/KlimaDAORetirementsByTokenOverviewChart";

/** Klima DAO Retirements by token Card */
export default function KlimaDAORetirementsByTokenOverviewCard(
  props: CardProps
) {
  const chart = (
    /* @ts-expect-error async Server component */
    <KlimaDAORetirementsByTokenOverviewChart />
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
