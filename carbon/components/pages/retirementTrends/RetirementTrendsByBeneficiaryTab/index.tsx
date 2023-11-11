import { t } from "@lingui/macro";
import RetirementsByBeneficiaryListCard from "components/cards/retirementTrends/RetirementsByBeneficiaryListCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";
import layout from "theme/layout.module.scss";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByBeneficiaryTab() {
  return (
    <DetailPage
      card={<RetirementsByBeneficiaryListCard className={layout.zIndexSeven} />}
      overview={t`The total number of retirements and amount of digital carbon credits retired via infrastructure built by KlimaDAO from a given beneficiary address.`}
      insights={{
        content: t`Lorem Ipsum`,
        source: "ai",
      }}
      backButtonHref={PageLinks.RetirementTrends}
    />
  );
}
