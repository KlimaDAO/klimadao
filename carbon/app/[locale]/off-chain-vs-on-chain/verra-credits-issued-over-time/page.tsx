import { t } from "@lingui/macro";
import DailyVerraCreditsCard from "components/cards/offVsOnChain/DailyVerraCreditsCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Verra credits retired over time`;
}
function description() {
  return t`The total number of carbon credits issued by carbon registry Verra that have been retired over time.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default function VerraCreditsRetiredOverTimePage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={<DailyVerraCreditsCard isDetailPage={true} status="issued" />}
      overview={description()}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
