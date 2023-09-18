import RetirementsByChainBarCard from "components/cards/retirementTrends/RetirementsByChainBarCard";
import RetirementsByChainListCard from "components/cards/retirementTrends/RetirementsByChainListCard";
import RetirementsByChainOverviewCard from "components/cards/retirementTrends/RetirementsByChainOverviewCard";
import { TwoColumnRetirementTrendsTab } from "components/pages/retirementTrends/TwoColumnRetirementTrendsTab";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByChainTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <RetirementsByChainBarCard key={0} />,
        <RetirementsByChainListCard key={1} />,
      ]}
      rightColumn={[<RetirementsByChainOverviewCard key={0} />]}
    />
  );
}
