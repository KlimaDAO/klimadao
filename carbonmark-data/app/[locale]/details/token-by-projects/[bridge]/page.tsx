import { t } from "@lingui/macro";
import TokenDistributionOfProjectsCard from "components/cards/tokenDetails/TokenDistributionOfProjectsCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
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
      overview={t`Lorem Ipsum`}
    />
  );
}
