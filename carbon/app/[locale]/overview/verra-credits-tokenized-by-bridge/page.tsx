import { t } from "@lingui/macro";
import { initLayout } from "app/[locale]/layout";
import TokenizedCreditsByBridgeCard from "components/cards/overview/TokenizedCreditsByBridgeCard";
import DetailPage from "components/pages/DetailPage";
import { LocalizedPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Tokenized credits by bridge`;
}
function description() {
  return t`A breakdown of carbon credits issued by carbon registry Verra which have been bridged and tokenized on a public blockchain.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default async function VerraCreditsTokenizedByBridgePage(
  props: LocalizedPageProps
) {
  await initLayout(props.params);
  return (
    <DetailPage
      pageTitle={title()}
      card={
        <TokenizedCreditsByBridgeCard
          isDetailPage={true}
          centerTitle={true}
          sourceHref={PageLinks.Overview}
        />
      }
      overview={description()}
      backButtonHref={PageLinks.Overview}
    />
  );
}
