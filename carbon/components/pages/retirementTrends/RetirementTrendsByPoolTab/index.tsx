import RetirementsByPoolBarCard from "components/cards/retirementTrends/RetirementsByPoolBarCard";
import RetirementsByPoolListCard from "components/cards/retirementTrends/RetirementsByPoolListCard";
import RetirementsByPoolOverviewCard from "components/cards/retirementTrends/RetirementsByPoolOverviewCard";
import RetirementsByPoolSummaryCard from "components/cards/retirementTrends/RetirementsByPoolSummaryCard";
import { TwoColumnRetirementTrendsTab } from "components/pages/retirementTrends/TwoColumnRetirementTrendsTab";
import layout from "theme/layout.module.scss";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByPoolTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <RetirementsByPoolBarCard key={0} className={layout.zIndexSeven} />,
        <RetirementsByPoolSummaryCard key={1} className={layout.zIndexSix} />,
        <RetirementsByPoolListCard key={2} className={layout.zIndexFive} />,
      ]}
      rightColumn={[
        <RetirementsByPoolOverviewCard key={0} className={layout.zIndexFour} />,
      ]}
    />
  );
}
