import { t } from "@lingui/macro";
import RetirementsByPoolBarCard from "components/cards/retirementTrends/RetirementsByPoolBarCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

export default function RetirementTrendsByPoolDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by pool`}
      card={<RetirementsByPoolBarCard isDetailPage={true} />}
      overview={t`The percentage of total retirements from each digital carbon pool in a given period.`}
      backButtonHref={`${PageLinks.RetirementTrends}?tab=byPool`}
    />
  );
}
