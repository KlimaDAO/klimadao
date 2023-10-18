import RetirementsByChainBarCard from "components/cards/retirementTrends/RetirementsByChainBarCard";
import RetirementsByChainListCard from "components/cards/retirementTrends/RetirementsByChainListCard";
import RetirementsByChainOverviewCard from "components/cards/retirementTrends/RetirementsByChainOverviewCard";
import { TwoColumnRetirementTrendsTab } from "components/pages/retirementTrends/TwoColumnRetirementTrendsTab";
import layout from "theme/layout.module.scss";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByChainTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <RetirementsByChainBarCard key={0} className={layout.zIndexSeven} />,
        <RetirementsByChainListCard key={1} className={layout.zIndexSix} />,
      ]}
      rightColumn={[
        <RetirementsByChainOverviewCard
          key={0}
          className={layout.zIndexFive}
        />,
      ]}
    />
  );
}
