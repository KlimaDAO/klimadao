import { t } from "@lingui/macro";
import VerraCreditsDistributionOfProjectsCard from "components/cards/offVsOnChain/VerraCreditsDistributionOfProjectsCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsIssuedByProjectTypePage() {
  return (
    <DetailPage
      pageTitle={t`Credits issued by project type`}
      card={
        <VerraCreditsDistributionOfProjectsCard
          isDetailPage={true}
          status="issued"
        />
      }
      overview={t`The total number of carbon credits that have been issued by carbon registry Verra sorted by carbon project type.`}
    />
  );
}
