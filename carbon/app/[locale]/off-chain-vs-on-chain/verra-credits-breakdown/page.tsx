import { t } from "@lingui/macro";
import VerraCreditsBreakdownCard from "components/cards/offVsOnChain/VerraCreditsBreakdownCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

export default function VerraCreditsBreakdownPage() {
  return (
    <DetailPage
      pageTitle={t`Verra credits breakdown`}
      card={<VerraCreditsBreakdownCard isDetailPage={true} />}
      overview={t`The total number of carbon credits that have been issued by carbon registry Verra and what portion have been bridged, tokenized, and retired on-chain.`}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
