import { t } from "@lingui/macro";
import RetirementsByChainChartCard from "components/cards/retirementTrends/RetirementsByChainChartCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Retirements by chain`;
}
function description() {
  return t`The percentage of all carbon credit retirements that are retired via infrastructure built by KlimaDAO over a given time period.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default function RetirementTrendsByChainDetailPage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={<RetirementsByChainChartCard isDetailPage={true} />}
      overview={description()}
      backButtonHref={`${PageLinks.RetirementTrends}?tab=byChain`}
    />
  );
}
