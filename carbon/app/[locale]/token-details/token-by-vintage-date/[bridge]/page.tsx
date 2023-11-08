import { t } from "@lingui/macro";
import TokenDistributionOfVintageCard from "components/cards/tokenDetails/TokenDistributionOfVintageCard";

import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { BridgePageParams, TokenDetailPageProps } from "components/pages/props";
import { getBridgeLabel } from "lib/bridges";

function title(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`${bridgeLabel} Distribution of vintage start dates`;
}
function description(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`A breakdown of the vintage dates of each carbon credit bridged via ${bridgeLabel}.`;
}

export async function generateMetadata({ params }: TokenDetailPageProps) {
  return {
    title: title(params),
    description: description(params),
  };
}

export default function TokenDistributionOfVintageDatePage(
  props: TokenDetailPageProps
) {
  return (
    <TokenDetailsDetailPage
      pageTitle={title(props.params)}
      card={
        <TokenDistributionOfVintageCard
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
