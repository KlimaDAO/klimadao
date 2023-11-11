import { t } from "@lingui/macro";
import { initLayout } from "app/[locale]/layout";
import CarbonSupplyQuickFactsCard from "components/cards/supply/CarbonSupplyQuickFactsCard";
import DetailPage from "components/pages/DetailPage";
import { LocalizedPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Digital carbon supply - quick facts`;
}
function description() {
  return t`A collection of data for quick reference including total supply, supply changes, and retirement trends.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default async function DigitalCarbonSupplyQuickFactsPage(
  props: LocalizedPageProps
) {
  await initLayout(props.params);
  return (
    <DetailPage
      pageTitle={title()}
      card={<CarbonSupplyQuickFactsCard isDetailPage={true} />}
      overview={description()}
      backButtonHref={PageLinks.Supply}
    />
  );
}
