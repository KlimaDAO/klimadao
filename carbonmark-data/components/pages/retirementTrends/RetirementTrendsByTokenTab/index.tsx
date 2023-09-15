import ChartCard from "components/cards/ChartCard";
import KlimaDAORetirementsByTokenBarCard from "components/cards/retirementTrends/KlimaDAORetirementsByTokenBarCard";
import KlimaDAORetirementsByTokenListCard from "components/cards/retirementTrends/KlimaDAORetirementsByTokenListCard";
import { TwoColumnRetirementTrendsTab } from "components/pages/retirementTrends/TwoColumnRetirementTrendsTab";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByTokenTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <KlimaDAORetirementsByTokenBarCard
          key={0}
        ></KlimaDAORetirementsByTokenBarCard>,
        <KlimaDAORetirementsByTokenListCard
          key={1}
        ></KlimaDAORetirementsByTokenListCard>,
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
