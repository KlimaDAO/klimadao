import { t } from "@lingui/macro";
import DailyCarbonSupplyCard from "components/cards/overview/DailyCarbonSupplyOverviewCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Digital carbon supply snapshot`;
}
function description() {
  return t`The total supply of digital carbon on each blockchain broken down by digital carbon pool.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default function DigitalCarbonSupplyPage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={<DailyCarbonSupplyCard isDetailPage={true}></DailyCarbonSupplyCard>}
      overview={description()}
      backButtonHref={PageLinks.Overview}
    />
  );
}
