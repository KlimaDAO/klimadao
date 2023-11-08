import { t } from "@lingui/macro";
import VerraCreditsByBridgeAndVintageCard from "components/cards/offVsOnChain/VerraCreditsByBridgeAndVintageCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

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
      overview={t`The total number of carbon credits that have been issued by carbon registry Verra sorted by the vintage start date of the carbon credit.`}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
