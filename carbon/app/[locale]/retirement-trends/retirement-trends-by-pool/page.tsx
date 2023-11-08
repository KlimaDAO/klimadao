import { t } from "@lingui/macro";
import RetirementsByPoolBarCard from "components/cards/retirementTrends/RetirementsByPoolBarCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Retirements by pool`;
}
function description() {
  return t`The percentage of total retirements from each digital carbon pool in a given period.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default function RetirementTrendsByPoolDetailPage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={<RetirementsByPoolBarCard isDetailPage={true} />}
      overview={description()}
      backButtonHref={`${PageLinks.RetirementTrends}?tab=byPool`}
    />
  );
}
