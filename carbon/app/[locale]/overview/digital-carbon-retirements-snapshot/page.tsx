import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import DailyCarbonRetirementsCard from "components/cards/overview/DailyCarbonRetirementsCard";
import DetailPage from "components/pages/DetailPage";
import { LocalizedPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Digital carbon retirements snapshot`;
}
function description() {
  return t`The total number of digital carbon credits retired on-chain over time sorted by blockchain and what portion was retired via infrastructure built by KlimaDAO.`;
}

export async function generateMetadata() {
  return {
    title: metaDataTitle(title()),
    description: description(),
  };
}

export default async function DigitalCarbonRetirementsPage(
  props: LocalizedPageProps
) {
  await initLayout(props.params);
  return (
    <DetailPage
      pageTitle={title()}
      card={
        <DailyCarbonRetirementsCard
          isDetailPage={true}
        ></DailyCarbonRetirementsCard>
      }
      overview={description()}
      backButtonHref={PageLinks.Overview}
    />
  );
}
