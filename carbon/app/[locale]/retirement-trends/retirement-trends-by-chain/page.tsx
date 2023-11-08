import { t } from "@lingui/macro";
import RetirementsByChainChartCard from "components/cards/retirementTrends/RetirementsByChainChartCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

export default function RetirementTrendsByChainDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by chain`}
      card={<RetirementsByChainChartCard isDetailPage={true} />}
      overview={t`The percentage of all carbon credit retirements that are retired via infrastructure built by KlimaDAO over a given time period.`}
      backButtonHref={`${PageLinks.RetirementTrends}?tab=byChain`}
    />
  );
}
