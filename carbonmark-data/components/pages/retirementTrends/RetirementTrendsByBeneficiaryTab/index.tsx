import { t } from "@lingui/macro";
import RetirementsByBeneficiaryListCard from "components/cards/retirementTrends/RetirementsByBeneficiaryListCard";
import DetailPage from "components/pages/DetailPage";
/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByBeneficiaryTab() {
  return (
    <DetailPage
      card={<RetirementsByBeneficiaryListCard />}
      overview={t`Lorem Ipsum`}
      insights={{
        content: t`Lorem Ipsum`,
        source: "ai",
      }}
    />
  );
}
