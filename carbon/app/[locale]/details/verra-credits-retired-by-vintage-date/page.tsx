import { t } from "@lingui/macro";
import VerraCreditsByBridgeAndVintageCard from "components/cards/offVsOnChain/VerraCreditsByBridgeAndVintageCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsRetiredByVintageDatePage() {
  return (
    <DetailPage
      pageTitle={t`Credits retired by vintage start date`}
      card={
        <VerraCreditsByBridgeAndVintageCard
          isDetailPage={true}
          status="all_retired"
        />
      }
      overview={t`The total number of carbon credits that have been issued by carbon registry Verra and retired sorted by the vintage start date of the carbon credit.`}
    />
  );
}
