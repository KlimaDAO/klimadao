import { t } from "@lingui/macro";
import RetirementsByBeneficiaryListCard from "components/cards/retirementTrends/RetirementsByBeneficiaryListCard";
import DetailPage from "components/pages/DetailPage";
import layout from "theme/layout.module.scss";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByBeneficiaryTab() {
  return (
    <DetailPage
      card={<RetirementsByBeneficiaryListCard className={layout.zIndexSeven} />}
      overview={t`Lorem Ipsum`}
      insights={{
        content: t`Lorem Ipsum`,
        source: "ai",
      }}
    />
  );
}
