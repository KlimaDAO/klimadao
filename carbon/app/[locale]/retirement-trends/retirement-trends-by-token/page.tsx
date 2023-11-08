import { t } from "@lingui/macro";
import RetirementsByTokenBarCard from "components/cards/retirementTrends/RetirementsByTokenBarCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Retirements by token`;
}
function description() {
  return t`The percentage of retirements via infrastructure built by KlimaDAO from each digital carbon token in a given period.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default function RetirementTrendsByTokenDetailPage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={<RetirementsByTokenBarCard isDetailPage={true} />}
      overview={description()}
      backButtonHref={`${PageLinks.RetirementTrends}?tab=byToken`}
    />
  );
}
