import { t } from "@lingui/macro";
import { initLayout } from "app/[locale]/layout";
import DailyCarbonSupplyCard from "components/cards/overview/DailyCarbonSupplyOverviewCard";
import DetailPage from "components/pages/DetailPage";
import { LocalizedPageProps } from "components/pages/props";
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

export default async function DigitalCarbonSupplyPage(
  props: LocalizedPageProps
) {
  await initLayout(props.params);
  return (
    <DetailPage
      pageTitle={title()}
      card={<DailyCarbonSupplyCard isDetailPage={true}></DailyCarbonSupplyCard>}
      overview={description()}
      backButtonHref={PageLinks.Overview}
    />
  );
}
