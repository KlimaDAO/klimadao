import { t } from "@lingui/macro";
import CarbonSupplyByBlockChainCard from "components/cards/supply/CarbonSupplyByBlockchainCard";
import DetailPage from "components/pages/DetailPage";

export default function DigitalCarbonSupplyByBlockchainPage() {
  return (
    <DetailPage
      pageTitle={t`Digital carbon supply by Blockchain`}
      card={<CarbonSupplyByBlockChainCard isDetailPage={true} />}
      overview={t`A breakdown of the current supply of digital carbon credits available on public blockchains.`}
    />
  );
}
