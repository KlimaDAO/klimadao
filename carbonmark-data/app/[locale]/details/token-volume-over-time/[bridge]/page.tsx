import { t } from "@lingui/macro";
import TokenVolumeOverTimeCard from "components/cards/tokenDetails/TokenVolumeOverTimeCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function TokenVolumeOverTimePage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} volume Over Time`}
      card={
        <TokenVolumeOverTimeCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
