import { t } from "@lingui/macro";
import TokenDistributionOfProjectsCard from "components/cards/tokenDetails/TokenDistributionOfProjectsCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function TokenDistributionOfProjectsPage(
  props: TokenDetailPageProps
) {
  const bridgeLabel = capitalize(props.params.bridge);
  return (
    <TokenDetailsDetailPage
      pageTitle={t`${bridgeLabel} distribution of projects`}
      card={
        <TokenDistributionOfProjectsCard
          isDetailPage={true}
          {...props.params}
          {...props.searchParams}
        />
      }
      overview={t`A breakdown of the carbon projects for which the carbon credits were issued and then bridged and pooled via ${bridgeLabel}.`}
      {...props}
    />
  );
}
