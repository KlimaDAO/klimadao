import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import RetirementsByChainChartCard from "components/cards/retirementTrends/RetirementsByChainChartCard";
import DetailPage from "components/pages/DetailPage";
import { LocalizedPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Retirements by chain`;
}
function description() {
  return t`The percentage of all carbon credit retirements that are retired via infrastructure built by KlimaDAO over a given time period.`;
}

export async function generateMetadata() {
  return {
    title: metaDataTitle(title()),
    description: description(),
  };
}

export default async function RetirementTrendsByChainDetailPage(
  props: LocalizedPageProps
) {
  await initLayout(props.params);
  return (
    <DetailPage
      pageTitle={title()}
      card={<RetirementsByChainChartCard isDetailPage={true} />}
      overview={description()}
      backButtonHref={`${PageLinks.RetirementTrends}?tab=byChain`}
    />
  );
}
