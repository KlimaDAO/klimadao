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
      overview={t`Lorem Ipsum`}
    />
  );
}
