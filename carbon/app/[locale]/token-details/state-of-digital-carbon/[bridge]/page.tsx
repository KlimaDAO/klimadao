import { t } from "@lingui/macro";
import TokenStateOfDigitalCarbonCard from "components/cards/tokenDetails/TokenStateOfDigitalCarbonCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { capitalize } from "lodash";

export default function TokenStateOfDigitalCarbonPage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <DetailPage
      pageTitle={t`State of ${bridgeLabel} digital carbon`}
      card={
        <TokenStateOfDigitalCarbonCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`The total number of digital carbon credits bridged via ${bridgeLabel} broken down by the current outstanding supply and retired digital carbon credits.`}
      backButtonHref={`${PageLinks.TokenDetails}?tab=${params.bridge}`}
    />
  );
}
