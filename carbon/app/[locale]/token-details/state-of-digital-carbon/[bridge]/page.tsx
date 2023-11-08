import { t } from "@lingui/macro";
import TokenStateOfDigitalCarbonCard from "components/cards/tokenDetails/TokenStateOfDigitalCarbonCard";
import DetailPage from "components/pages/DetailPage";
import { BridgePageParams, TokenDetailPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { getBridgeLabel } from "lib/bridges";

function title(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`State of ${bridgeLabel} digital carbon`;
}
function description(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`The total number of digital carbon credits bridged via ${bridgeLabel} broken down by the current outstanding supply and retired digital carbon credits.`;
}

export async function generateMetadata({ params }: TokenDetailPageProps) {
  return {
    title: title(params),
    description: description(params),
  };
}

export default function TokenStateOfDigitalCarbonPage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  return (
    <DetailPage
      pageTitle={title(params)}
      card={
        <TokenStateOfDigitalCarbonCard
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
