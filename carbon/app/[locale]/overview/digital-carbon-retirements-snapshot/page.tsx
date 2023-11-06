import { t } from "@lingui/macro";
import DailyCarbonRetirementsCard from "components/cards/overview/DailyCarbonRetirementsCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

export default function DigitalCarbonRetirementsPage() {
  return (
    <DetailPage
      pageTitle={t`Digital carbon retirements snapshot`}
      card={
        <DailyCarbonRetirementsCard
          isDetailPage={true}
        ></DailyCarbonRetirementsCard>
      }
      overview={t`The total number of digital carbon credits retired on-chain over time sorted by blockchain and what portion was retired via infrastructure built by KlimaDAO.`}
      backButtonHref={PageLinks.Overview}
    />
  );
}
