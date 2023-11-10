import { t } from "@lingui/macro";
import { initLayout } from "app/[locale]/layout";
import TokenPoolBreakdownCard from "components/cards/tokenDetails/TokenPoolBreakdownCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { getBridgeLabel } from "lib/bridges";

function title(props: TokenDetailPageProps) {
  const bridgeLabel = getBridgeLabel(props.params.bridge);
  return t`Breakdown of ${bridgeLabel} pooled`;
}
function description(props: TokenDetailPageProps) {
  const bridgeLabel = getBridgeLabel(props.params.bridge);
  return t`A breakdown of the current supply of carbon credits bridged via ${bridgeLabel} and pooled into digital carbon pools.`;
}

export async function generateMetadata(props: TokenDetailPageProps) {
  return {
    title: title(props),
    description: description(props),
  };
}

export default async function TokenPoolBreakdownPage(
  props: TokenDetailPageProps
) {
  await initLayout(props.params);

  return (
    <DetailPage
      pageTitle={title(props)}
      card={
        <TokenPoolBreakdownCard
          isDetailPage={true}
          {...props.params}
          {...props.searchParams}
        />
      }
      overview={description(props)}
      backButtonHref={`${PageLinks.TokenDetails}?tab=${props.params.bridge}`}
    />
  );
}
