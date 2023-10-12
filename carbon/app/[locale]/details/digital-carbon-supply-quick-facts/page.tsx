import { t } from "@lingui/macro";
import CarbonSupplyQuickFactsCard from "components/cards/supply/CarbonSupplyQuickFactsCard";
import DetailPage from "components/pages/DetailPage";

export default function DigitalCarbonSupplyQuickFactsPage() {
  return (
    <DetailPage
      pageTitle={t`Digital carbon supply - quick Facts`}
      card={<CarbonSupplyQuickFactsCard isDetailPage={true} />}
      overview={t`Lorem Ipsum`}
    />
  );
}
