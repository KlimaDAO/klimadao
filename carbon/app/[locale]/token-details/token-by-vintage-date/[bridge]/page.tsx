import { t } from "@lingui/macro";
import TokenDistributionOfVintageCard from "components/cards/tokenDetails/TokenDistributionOfVintageCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function TokenDistributionOfVintageDatePage(
  props: TokenDetailPageProps
) {
  const bridgeLabel = capitalize(props.params.bridge);

  return (
    <TokenDetailsDetailPage
      pageTitle={t`${bridgeLabel} Distribution of vintage start dates`}
      card={
        <TokenDistributionOfVintageCard
          isDetailPage={true}
          {...props.params}
          {...props.searchParams}
        />
      }
      overview={t`A breakdown of the vintage dates of each carbon credit bridged via ${bridgeLabel}.`}
      {...props}
    />
  );
}
