import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import VerraCreditsByBridgeAndVintageCard from "components/cards/offVsOnChain/VerraCreditsByBridgeAndVintageCard";
import DetailPage from "components/pages/DetailPage";
import { LocalizedPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Credits issued by vintage start date`;
}
function description() {
  return t`The total number of carbon credits that have been issued by carbon registry Verra sorted by the vintage start date of the carbon credit.`;
}

export async function generateMetadata() {
  return {
    title: metaDataTitle(title()),
    description: description(),
  };
}

export default async function VerraCreditsIssuedByVintagePage(
  props: LocalizedPageProps
) {
  await initLayout(props.params);
  return (
    <DetailPage
      pageTitle={title()}
      card={
        <VerraCreditsByBridgeAndVintageCard
          isDetailPage={true}
          status="issued"
        />
      }
      overview={description()}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
