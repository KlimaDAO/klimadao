import { t } from "@lingui/macro";
import { initLayout } from "app/[locale]/layout";
import RetirementsByPoolBarCard from "components/cards/retirementTrends/RetirementsByPoolBarCard";
import DetailPage from "components/pages/DetailPage";
import { LocalizedPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Retirements by pool`;
}
function description() {
  return t`The percentage of total retirements from each digital carbon pool in a given period.`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default async function RetirementTrendsByPoolDetailPage(
  props: LocalizedPageProps
) {
  await initLayout(props.params);
  return (
    <DetailPage
      pageTitle={title()}
      card={<RetirementsByPoolBarCard isDetailPage={true} />}
      overview={description()}
      backButtonHref={`${PageLinks.RetirementTrends}?tab=byPool`}
    />
  );
}
