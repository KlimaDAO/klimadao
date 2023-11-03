import { t } from "@lingui/macro";
import DailyCarbonSupplyByProtocolCard from "components/cards/offVsOnChain/DailyCarbonSupplyByProtocolCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

export default function VerraCreditsTokenizedOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Verra credits tokenized over time`}
      card={
        <DailyCarbonSupplyByProtocolCard isDetailPage={true} status="issued" />
      }
      overview={t`The total number of carbon credits issued by carbon registry Verra which have been bridged and tokenized on a public blockchain over time.`}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
