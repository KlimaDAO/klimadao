import ChartCard from "components/cards/ChartCard";
import { TwoColumnRetirementTrendsTab } from "components/tabs/TwoColumnRetirementTrendsTab";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByChainTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <ChartCard key={0} isColumnCard={true} title="Retirements by chain" />,
        <ChartCard
          key={1}
          isColumnCard={true}
          title="Detailed list of KlimaDAO retirements"
        />,
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
