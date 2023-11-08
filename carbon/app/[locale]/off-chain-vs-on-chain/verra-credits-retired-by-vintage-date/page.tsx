import { t } from "@lingui/macro";
import VerraCreditsByBridgeAndVintageCard from "components/cards/offVsOnChain/VerraCreditsByBridgeAndVintageCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Credits retired by vintage start date`;
}
function description() {
  return t`The total number of carbon credits that have been issued by carbon registry Verra and retired sorted by the vintage start date of the carbon credit.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default function VerraCreditsRetiredByVintageDatePage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={
        <VerraCreditsByBridgeAndVintageCard
          isDetailPage={true}
          status="all_retired"
        />
      }
      overview={description()}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
