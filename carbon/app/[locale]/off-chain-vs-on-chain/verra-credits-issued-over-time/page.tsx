import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import DailyVerraCreditsCard from "components/cards/offVsOnChain/DailyVerraCreditsCard";
import DetailPage from "components/pages/DetailPage";
import { LocalizedPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Verra credits retired over time`;
}
function description() {
  return t`The total number of carbon credits issued by carbon registry Verra that have been retired over time.`;
}

export async function generateMetadata() {
  return {
    title: metaDataTitle(title()),
    description: description(),
  };
}

export default async function VerraCreditsRetiredOverTimePage(
  props: LocalizedPageProps
) {
  await initLayout(props.params);
  return (
    <DetailPage
      pageTitle={title()}
      card={<DailyVerraCreditsCard isDetailPage={true} status="issued" />}
      overview={description()}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
