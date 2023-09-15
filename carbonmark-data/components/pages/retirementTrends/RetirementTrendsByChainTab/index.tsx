import ChartCard from "components/cards/ChartCard";
import KlimaDAORetirementsByChainListCard from "components/cards/retirementTrends/KlimaDAORetirementsByChainListCard";
import { TwoColumnRetirementTrendsTab } from "components/pages/retirementTrends/TwoColumnRetirementTrendsTab";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByChainTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <ChartCard key={0} isColumnCard={true} title="Retirements by chain" />,
        <KlimaDAORetirementsByChainListCard
          key={1}
        ></KlimaDAORetirementsByChainListCard>,
      ]}
      rightColumn={[
        <ChartCard
          key={0}
          isColumnCard={true}
          title="Carbon pool redemptions / retirements"
        />,
      ]}
    />
  );
}
