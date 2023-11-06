import { t } from "@lingui/macro";
import TokenPoolBreakdownCard from "components/cards/tokenDetails/TokenPoolBreakdownCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { capitalize } from "lodash";

export default function TokenPoolBreakdownPage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <DetailPage
      pageTitle={t`Breakdown of ${bridgeLabel} pooled`}
      card={
        <TokenPoolBreakdownCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`A breakdown of the current supply of carbon credits bridged via ${bridgeLabel} and pooled into digital carbon pools.`}
      backButtonHref={`${PageLinks.TokenDetails}?tab=${params.bridge}`}
    />
  );
}
