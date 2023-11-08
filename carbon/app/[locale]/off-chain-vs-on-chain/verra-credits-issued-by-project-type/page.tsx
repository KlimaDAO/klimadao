import { t } from "@lingui/macro";
import VerraCreditsDistributionOfProjectsCard from "components/cards/offVsOnChain/VerraCreditsDistributionOfProjectsCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Credits issued by project type`;
}
function description() {
  return t`The total number of carbon credits that have been issued by carbon registry Verra sorted by carbon project type.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}
export default function VerraCreditsIssuedByProjectTypePage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={
        <VerraCreditsDistributionOfProjectsCard
          isDetailPage={true}
          status="issued"
        />
      }
      overview={description()}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
