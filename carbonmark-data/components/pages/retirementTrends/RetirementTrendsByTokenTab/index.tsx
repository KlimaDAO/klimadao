import ChartCard from "components/cards/ChartCard";
import KlimaDAORetirementsCard from "components/cards/retirementTrends/KlimaDAORetirementsByPoolListCard";
import { TwoColumnRetirementTrendsTab } from "components/pages/retirementTrends/TwoColumnRetirementTrendsTab";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByTokenTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <ChartCard
          key={0}
          isColumnCard={true}
          title="Detailed list of KlimaDAO retirements"
        />,
        <ChartCard
          key={1}
          isColumnCard={true}
          title="Detailed list of KlimaDAO retirements"
        />,
        <KlimaDAORetirementsCard key={2}></KlimaDAORetirementsCard>,
      ]}
      rightColumn={[
        <ChartCard
          key={0}
          isColumnCard={true}
          title="Carbon token retirements"
        />,
      ]}
    />
  );
}
