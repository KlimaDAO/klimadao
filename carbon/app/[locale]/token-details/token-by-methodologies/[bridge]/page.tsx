import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import TokenDistributionOfMethodologiesCard from "components/cards/tokenDetails/TokenDistributionOfMethodologiesCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { BridgePageParams, TokenDetailPageProps } from "components/pages/props";
import { getBridgeLabel } from "lib/bridges";

function title(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`${bridgeLabel} distribution of methodologies`;
}
function description(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`A breakdown of the methodologies used to validate and issue each carbon credit bridged via ${bridgeLabel}.`;
}

export async function generateMetadata({ params }: TokenDetailPageProps) {
  return {
    title: metaDataTitle(title(params)),
    description: description(params),
  };
}
export default async function TokenDistributionOfMethodologiesPage(
  props: TokenDetailPageProps
) {
  await initLayout(props.params);
  return (
    <TokenDetailsDetailPage
      pageTitle={title(props.params)}
      card={
        <TokenDistributionOfMethodologiesCard
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
