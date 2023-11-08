import { t } from "@lingui/macro";
import TokenDistributionOfMethodologiesCard from "components/cards/tokenDetails/TokenDistributionOfMethodologiesCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function TokenDistributionOfMethodologiesPage(
  props: TokenDetailPageProps
) {
  const bridgeLabel = capitalize(props.params.bridge);
  return (
    <TokenDetailsDetailPage
      pageTitle={t`${bridgeLabel} distribution of methodologies`}
      card={
        <TokenDistributionOfMethodologiesCard
          isDetailPage={true}
          {...props.params}
          {...props.searchParams}
        />
      }
      overview={t`A breakdown of the methodologies used to validate and issue each carbon credit bridged via ${bridgeLabel}.`}
      {...props}
    />
  );
}
