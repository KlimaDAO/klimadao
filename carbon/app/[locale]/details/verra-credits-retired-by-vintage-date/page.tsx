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
          status="retired"
        />
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
