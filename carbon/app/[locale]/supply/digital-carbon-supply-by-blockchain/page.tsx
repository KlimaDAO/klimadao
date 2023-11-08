import { t } from "@lingui/macro";
import CarbonSupplyByBlockChainCard from "components/cards/supply/CarbonSupplyByBlockchainCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Digital carbon supply by Blockchain`;
}
function description() {
  return t`A breakdown of the current supply of digital carbon credits available on public blockchains.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default function DigitalCarbonSupplyByBlockchainPage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={<CarbonSupplyByBlockChainCard isDetailPage={true} />}
      overview={description()}
      backButtonHref={PageLinks.Supply}
    />
  );
}
