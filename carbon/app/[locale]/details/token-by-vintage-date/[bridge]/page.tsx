import { t } from "@lingui/macro";
import TokenDistributionOfVintageCard from "components/cards/tokenDetails/TokenDistributionOfVintageCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function TokenDistributionOfVintageDatePage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <TokenDetailsDetailPage
      bridge={params.bridge}
      pageTitle={t`${bridgeLabel} Distribution of vintage start dates`}
      card={
        <TokenDistributionOfVintageCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`A breakdown of the vintage dates of each carbon credit bridged via ${bridgeLabel}.`}
    />
  );
}
