import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import TokenDistributionOfProjectsCard from "components/cards/tokenDetails/TokenDistributionOfProjectsCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { BridgePageParams, TokenDetailPageProps } from "components/pages/props";
import { getBridgeLabel } from "lib/bridges";

function title(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`${bridgeLabel} distribution of projects`;
}
function description(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`A breakdown of the carbon projects for which the carbon credits were issued and then bridged and pooled via ${bridgeLabel}.`;
}

export async function generateMetadata({ params }: TokenDetailPageProps) {
  return {
    title: metaDataTitle(title(params)),
    description: description(params),
  };
}

export default async function TokenDistributionOfProjectsPage(
  props: TokenDetailPageProps
) {
  await initLayout(props.params);
  return (
    <TokenDetailsDetailPage
      pageTitle={title(props.params)}
      card={
        <TokenDistributionOfProjectsCard
          isDetailPage={true}
          {...props.params}
          {...props.searchParams}
        />
      }
      overview={description(props.params)}
      {...props}
    />
  );
}
