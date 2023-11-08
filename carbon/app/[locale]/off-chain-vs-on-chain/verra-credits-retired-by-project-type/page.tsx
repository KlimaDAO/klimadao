import { t } from "@lingui/macro";
import VerraCreditsDistributionOfProjectsCard from "components/cards/offVsOnChain/VerraCreditsDistributionOfProjectsCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

export default function VerraCreditsRetiredByProjectTypePage() {
  return (
    <DetailPage
      pageTitle={t`Credits retired by project type`}
      card={
        <VerraCreditsDistributionOfProjectsCard
          isDetailPage={true}
          status="all_retired"
        />
      }
      overview={t`The total number of carbon credits that have been issued by carbon registry Verra and retired sorted by carbon project type.`}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
