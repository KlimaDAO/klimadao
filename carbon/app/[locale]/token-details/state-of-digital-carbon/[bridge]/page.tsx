import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import TokenStateOfDigitalCarbonCard from "components/cards/tokenDetails/TokenStateOfDigitalCarbonCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { getBridgeLabel } from "lib/bridges";

function title(props: TokenDetailPageProps) {
  const bridgeLabel = getBridgeLabel(props.params.bridge);
  return t`State of ${bridgeLabel} digital carbon`;
}
function description(props: TokenDetailPageProps) {
  const bridgeLabel = getBridgeLabel(props.params.bridge);
  return t`The total number of digital carbon credits bridged via ${bridgeLabel} broken down by the current outstanding supply and retired digital carbon credits.`;
}

export async function generateMetadata(props: TokenDetailPageProps) {
  return {
    title: metaDataTitle(title(props)),
    description: description(props),
  };
}

export default async function TokenStateOfDigitalCarbonPage(
  props: TokenDetailPageProps
) {
  await initLayout(props.params);
  return (
    <DetailPage
      pageTitle={title(props)}
      card={
        <TokenStateOfDigitalCarbonCard
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
