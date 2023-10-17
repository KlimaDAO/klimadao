import RetirementsByTokenBarCard from "components/cards/retirementTrends/RetirementsByTokenBarCard";
import RetirementsByTokenListCard from "components/cards/retirementTrends/RetirementsByTokenListCard";
import RetirementsByTokenOverviewCard from "components/cards/retirementTrends/RetirementsByTokenOverviewCard";
import { TwoColumnRetirementTrendsTab } from "components/pages/retirementTrends/TwoColumnRetirementTrendsTab";
import layout from "theme/layout.module.scss";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByTokenTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <RetirementsByTokenBarCard key={0} className={layout.zIndexSeven} />,
        <RetirementsByTokenListCard key={1} className={layout.zIndexSix} />,
      ]}
      rightColumn={[
        <RetirementsByTokenOverviewCard
          key={1}
          className={layout.zIndexFive}
        />,
      ]}
    />
  );
}
