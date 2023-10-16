import { t } from "@lingui/macro";
import RetirementsByChainBarCard from "components/cards/retirementTrends/RetirementsByChainBarCard";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByChainDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by chain`}
      card={<RetirementsByChainBarCard isDetailPage={true} />}
      overview={t`The percentage of all carbon credit retirements that are retired via infrastructure built by KlimaDAO over a given time period.`}
    />
  );
}
