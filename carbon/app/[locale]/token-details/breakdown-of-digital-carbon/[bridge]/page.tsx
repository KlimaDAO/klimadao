import { t } from "@lingui/macro";
import TokenPoolBreakdownCard from "components/cards/tokenDetails/TokenPoolBreakdownCard";
import DetailPage from "components/pages/DetailPage";
import { BridgePageParams, TokenDetailPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { getBridgeLabel } from "lib/bridges";

function title(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`Breakdown of ${bridgeLabel} pooled`;
}
function description(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`A breakdown of the current supply of carbon credits bridged via ${bridgeLabel} and pooled into digital carbon pools.`;
}

export async function generateMetadata({ params }: TokenDetailPageProps) {
  return {
    title: title(params),
    description: description(params),
  };
}

export default function TokenPoolBreakdownPage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  return (
    <DetailPage
      pageTitle={title(params)}
      card={
        <TokenPoolBreakdownCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={description(params)}
      backButtonHref={`${PageLinks.TokenDetails}?tab=${params.bridge}`}
    />
  );
}
