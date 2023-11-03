import { t } from "@lingui/macro";
import CarbonSupplyQuickFactsCard from "components/cards/supply/CarbonSupplyQuickFactsCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

export default function DigitalCarbonSupplyQuickFactsPage() {
  return (
    <DetailPage
      pageTitle={t`Digital carbon supply - quick facts`}
      card={<CarbonSupplyQuickFactsCard isDetailPage={true} />}
      overview={t`A collection of data for quick reference including total supply, supply changes, and retirement trends.`}
      backButtonHref={PageLinks.Supply}
    />
  );
}
