import { TwoColumnRetirementTrendsPage } from "app/[locale]/retirement-trends/page";
import ChartCard from "components/cards/ChartCard";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByChainTab() {
  return (
    <TwoColumnRetirementTrendsPage
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
