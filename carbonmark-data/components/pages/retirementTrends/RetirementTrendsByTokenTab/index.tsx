import RetirementsByTokenBarCard from "components/cards/retirementTrends/RetirementsByTokenBarCard";
import RetirementsByTokenListCard from "components/cards/retirementTrends/RetirementsByTokenListCard";
import RetirementsByTokenOverviewCard from "components/cards/retirementTrends/RetirementsByTokenOverviewCard";
import { TwoColumnRetirementTrendsTab } from "components/pages/retirementTrends/TwoColumnRetirementTrendsTab";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByTokenTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <RetirementsByTokenBarCard key={0} />,
        <RetirementsByTokenListCard key={1} />,
      ]}
      rightColumn={[<RetirementsByTokenOverviewCard key={1} />]}
    />
  );
}
