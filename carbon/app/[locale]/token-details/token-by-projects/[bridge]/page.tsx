import { t } from "@lingui/macro";
import TokenDistributionOfProjectsCard from "components/cards/tokenDetails/TokenDistributionOfProjectsCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { capitalize } from "lodash";

export default function TokenDistributionOfProjectsPage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} distribution of projects`}
      card={
        <TokenDistributionOfProjectsCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`A breakdown of the carbon projects for which the carbon credits were issued and then bridged and pooled via ${bridgeLabel}.`}
      backButtonHref={`${PageLinks.TokenDetails}?tab=${params.bridge}`}
    />
  );
}
