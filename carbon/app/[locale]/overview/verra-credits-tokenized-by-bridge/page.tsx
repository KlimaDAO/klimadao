import { t } from "@lingui/macro";
import TokenizedCreditsByBridgeCard from "components/cards/overview/TokenizedCreditsByBridgeCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

export default function VerraCreditsTokenizedByBridgePage() {
  return (
    <DetailPage
      pageTitle={t`Tokenized credits by bridge`}
      card={
        <TokenizedCreditsByBridgeCard
          isDetailPage={true}
          centerTitle={true}
          sourceHref={PageLinks.Overview}
        />
      }
      overview={t`A breakdown of carbon credits issued by carbon registry Verra which have been bridged and tokenized on a public blockchain.`}
      backButtonHref={PageLinks.Overview}
    />
  );
}
