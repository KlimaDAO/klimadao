import ChartCard from "components/cards/ChartCard";
import KlimaDAORetirementsByPoolBarCard from "components/cards/KlimaDAORetirementsByPoolBarCard";
import KlimaDAORetirementsByPoolTableCard from "components/cards/KlimaDAORetirementsByPoolTableCard";
import { TwoColumnRetirementTrendsTab } from "components/tabs/TwoColumnRetirementTrendsTab";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByPoolTab() {
  return (
    <TwoColumnRetirementTrendsTab
      leftColumn={[
        <KlimaDAORetirementsByPoolBarCard
          key={0}
        ></KlimaDAORetirementsByPoolBarCard>,
        <KlimaDAORetirementsByPoolTableCard
          key={1}
        ></KlimaDAORetirementsByPoolTableCard>,
        <ChartCard
          key={2}
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
