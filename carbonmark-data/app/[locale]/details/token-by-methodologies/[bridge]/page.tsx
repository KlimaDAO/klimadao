import { t } from "@lingui/macro";
import TokenDistributionOfMethodologiesCard from "components/cards/tokenDetails/TokenDistributionOfMethodologiesCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function TokenDistributionOfMethodologiesPage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} Distribution of Methodologies`}
      card={
        <TokenDistributionOfMethodologiesCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
