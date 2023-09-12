import { t } from "@lingui/macro";
import ChartCard from "components/cards/ChartCard";
import DetailPage from "components/pages/DetailPage";
/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByBeneficiaryTab() {
  return (
    <DetailPage
      card={
        <ChartCard
          isColumnCard={true}
          title="Carbon pool redemptions / retirements"
        />
      }
      overview={t`Lorem Ipsum`}
      insights={{
        content: t`Lorem Ipsum`,
        source: "ai",
      }}
    />
  );
}
