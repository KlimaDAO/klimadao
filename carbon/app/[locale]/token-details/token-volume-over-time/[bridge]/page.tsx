import { t } from "@lingui/macro";
import TokenVolumeOverTimeCard from "components/cards/tokenDetails/TokenVolumeOverTimeCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { capitalize } from "lodash";

export default function TokenVolumeOverTimePage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} volume over Time`}
      card={
        <TokenVolumeOverTimeCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`The volume of digital carbon credits in ${bridgeLabel} digital carbon pools over a given time period.`}
      backButtonHref={`${PageLinks.TokenDetails}?tab=${params.bridge}`}
    />
  );
}
