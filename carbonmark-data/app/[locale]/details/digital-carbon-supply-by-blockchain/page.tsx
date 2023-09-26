import { t } from "@lingui/macro";
import CarbonSupplyByBlockChainCard from "components/cards/supply/CarbonSupplyByBlockchainCard";
import DetailPage from "components/pages/DetailPage";

export default function DigitalCarbonSupplyByBlockchainPage() {
  return (
    <DetailPage
      pageTitle={t`Digital carbon supply by Blockchain`}
      card={<CarbonSupplyByBlockChainCard isDetailPage={true} />}
      overview={t`Lorem Ipsum`}
    />
  );
}
