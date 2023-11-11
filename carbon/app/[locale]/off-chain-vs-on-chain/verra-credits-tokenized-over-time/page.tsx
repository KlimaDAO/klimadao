import { t } from "@lingui/macro";
import { initLayout } from "app/[locale]/layout";
import DailyCarbonSupplyByProtocolCard from "components/cards/offVsOnChain/DailyCarbonSupplyByProtocolCard";
import DetailPage from "components/pages/DetailPage";
import { LocalizedPageProps } from "components/pages/props";
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

export default async function VerraCreditsTokenizedOverTimePage(
  props: LocalizedPageProps
) {
  await initLayout(props.params);
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
