import { t } from "@lingui/macro";
import DailyVerraCreditsCard from "components/cards/offVsOnChain/DailyVerraCreditsCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Off-chain Verra credits retired over time`;
}
function description() {
  return t`The total number of carbon credits issued by carbon registry Verra and retired over time. Off-chain refers carbon credits retired via legacy methods as compared to on-chain digital carbon credits bridged and tokenized on a public blockchain.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default function VerraCreditsRetiredOffChainOverTimePage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={<DailyVerraCreditsCard isDetailPage={true} status="all_retired" />}
      overview={description()}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
