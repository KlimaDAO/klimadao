import { t } from "@lingui/macro";
import KlimaDAORetirementsByBeneficiaryListCard from "components/cards/retirementTrends/KlimaDAORetirementsByBeneficiaryListCard";
import DetailPage from "components/pages/DetailPage";
/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByBeneficiaryTab() {
  return (
    <DetailPage
      card={
        <KlimaDAORetirementsByBeneficiaryListCard></KlimaDAORetirementsByBeneficiaryListCard>
      }
      overview={t`Lorem Ipsum`}
      insights={{
        content: t`Lorem Ipsum`,
        source: "ai",
      }}
    />
  );
}
