import RetirementsByPoolBarCard from "components/cards/retirementTrends/RetirementsByPoolBarCard";
import RetirementsByPoolListCard from "components/cards/retirementTrends/RetirementsByPoolListCard";
import RetirementsByPoolOverviewCard from "components/cards/retirementTrends/RetirementsByPoolOverviewCard";
import RetirementsByPoolSummaryCard from "components/cards/retirementTrends/RetirementsByPoolSummaryCard";
import { TwoColumnRetirementTrendsTab } from "components/pages/retirementTrends/TwoColumnRetirementTrendsTab";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByPoolTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <RetirementsByPoolBarCard key={0} />,
        <RetirementsByPoolSummaryCard key={1} />,
        <RetirementsByPoolListCard key={2} />,
      ]}
      rightColumn={[<RetirementsByPoolOverviewCard key={0} />]}
    />
  );
}
