import KlimaDAORetirementsByPoolBarCard from "components/cards/retirementTrends/KlimaDAORetirementsByPoolBarCard";
import KlimaDAORetirementsByPoolListCard from "components/cards/retirementTrends/KlimaDAORetirementsByPoolListCard";
import KlimaDAORetirementsByPoolOverviewCard from "components/cards/retirementTrends/KlimaDAORetirementsByPoolOverviewCard";
import KlimaDAORetirementsByPoolSummaryCard from "components/cards/retirementTrends/KlimaDAORetirementsByPoolSummaryCard";
import { TwoColumnRetirementTrendsTab } from "components/pages/retirementTrends/TwoColumnRetirementTrendsTab";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByPoolTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <KlimaDAORetirementsByPoolBarCard key={0} />,
        <KlimaDAORetirementsByPoolSummaryCard key={1} />,
        <KlimaDAORetirementsByPoolListCard key={2} />,
      ]}
      rightColumn={[<KlimaDAORetirementsByPoolOverviewCard key={0} />]}
    />
  );
}
