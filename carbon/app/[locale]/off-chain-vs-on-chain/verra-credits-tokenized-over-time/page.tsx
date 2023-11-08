import { t } from "@lingui/macro";
import DailyCarbonSupplyByProtocolCard from "components/cards/offVsOnChain/DailyCarbonSupplyByProtocolCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Verra credits tokenized over time`;
}
function description() {
  return t`The total number of carbon credits issued by carbon registry Verra which have been bridged and tokenized on a public blockchain over time.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default function VerraCreditsTokenizedOverTimePage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={
        <DailyCarbonSupplyByProtocolCard isDetailPage={true} status="issued" />
      }
      overview={description()}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
