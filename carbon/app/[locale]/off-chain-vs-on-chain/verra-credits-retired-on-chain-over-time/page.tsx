import { t } from "@lingui/macro";
import DailyCarbonSupplyByProtocolCard from "components/cards/offVsOnChain/DailyCarbonSupplyByProtocolCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`On-chain Verra credits retired over time`;
}
function description() {
  return t`The total number of carbon credits issued by carbon registry Verra and retired over time. On-chain refers to credits bridged and tokenized on a public blockchain.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default function VerraCreditsRetiredOnChainOverTimePage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={
        <DailyCarbonSupplyByProtocolCard
          isDetailPage={true}
          status="all_retired"
        />
      }
      overview={description()}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
