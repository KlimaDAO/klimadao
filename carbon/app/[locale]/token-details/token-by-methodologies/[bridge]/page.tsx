import { t } from "@lingui/macro";
import TokenDistributionOfMethodologiesCard from "components/cards/tokenDetails/TokenDistributionOfMethodologiesCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { capitalize } from "lodash";

export default function TokenDistributionOfMethodologiesPage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} distribution of methodologies`}
      card={
        <TokenDistributionOfMethodologiesCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`A breakdown of the methodologies used to validate and issue each carbon credit bridged via ${bridgeLabel}.`}
      backButtonHref={`${PageLinks.TokenDetails}?tab=${params.bridge}`}
    />
  );
}
