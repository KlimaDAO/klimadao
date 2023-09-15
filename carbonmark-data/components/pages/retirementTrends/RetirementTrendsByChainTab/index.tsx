import KlimaDAORetirementsByChainBarCard from "components/cards/retirementTrends/KlimaDAORetirementsByChainBarCard";
import KlimaDAORetirementsByChainListCard from "components/cards/retirementTrends/KlimaDAORetirementsByChainListCard";
import KlimaDAORetirementsByChainOverviewCard from "components/cards/retirementTrends/KlimaDAORetirementsByChainOverviewCard";
import { TwoColumnRetirementTrendsTab } from "components/pages/retirementTrends/TwoColumnRetirementTrendsTab";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByChainTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <KlimaDAORetirementsByChainBarCard key={0} />,
        <KlimaDAORetirementsByChainListCard key={1} />,
      ]}
      rightColumn={[<KlimaDAORetirementsByChainOverviewCard key={0} />]}
    />
  );
}
