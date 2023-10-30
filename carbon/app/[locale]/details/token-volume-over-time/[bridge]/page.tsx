import { t } from "@lingui/macro";
import TokenVolumeOverTimeCard from "components/cards/tokenDetails/TokenVolumeOverTimeCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function TokenVolumeOverTimePage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <TokenDetailsDetailPage
      bridge={params.bridge}
      pageTitle={t`${bridgeLabel} volume over Time`}
      card={
        <TokenVolumeOverTimeCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`The volume of digital carbon credits in ${bridgeLabel} digital carbon pools over a given time period.`}
    ></TokenDetailsDetailPage>
  );
}
