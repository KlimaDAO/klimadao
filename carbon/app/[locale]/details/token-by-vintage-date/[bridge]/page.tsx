import { t } from "@lingui/macro";
import TokenDistributionOfVintageCard from "components/cards/tokenDetails/TokenDistributionOfVintageCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function TokenDistributionOfVintageDatePage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} Distribution of vintage start dates`}
      card={
        <TokenDistributionOfVintageCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
