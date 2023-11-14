import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import DailyVerraCreditsCard from "components/cards/overview/DailyVerraCreditsOverviewCard";
import DetailPage from "components/pages/DetailPage";
import { LocalizedPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Verra credits over time`;
}
function description() {
  return t`The total number of carbon credits issued by carbon registry Verra over time and the number of credits retired over time. On-chain refers to credits bridged and tokenized on a public blockchain.`;
}

export async function generateMetadata() {
  return {
    title: metaDataTitle(title()),
    description: description(),
  };
}

export default async function VerraCreditsOverTimePage(
  props: LocalizedPageProps
) {
  await initLayout(props.params);
  return (
    <DetailPage
      pageTitle={title()}
      card={<DailyVerraCreditsCard isDetailPage={true}></DailyVerraCreditsCard>}
      overview={description()}
      insights={{ content: t`Lorem Ipsum`, source: "ai" }}
      backButtonHref={PageLinks.Overview}
    />
  );
}
