import { t } from "@lingui/macro";
import VerraCreditsByBridgeAndVintageCard from "components/cards/offVsOnChain/VerraCreditsByBridgeAndVintageCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsIssuedByVintagePage() {
  return (
    <DetailPage
      pageTitle={t`Credits issued by vintage start date`}
      card={
        <VerraCreditsByBridgeAndVintageCard
          isDetailPage={true}
          status="issued"
        />
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
