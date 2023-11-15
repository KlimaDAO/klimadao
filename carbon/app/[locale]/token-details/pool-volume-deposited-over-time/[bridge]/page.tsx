import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import PoolVolumeOverTimeCard from "components/cards/tokenDetails/PoolVolumeOverTimeCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { getPoolLabel } from "lib/pools";

function title(props: TokenDetailPageProps) {
  const poolLabel = getPoolLabel(props.searchParams.pool);
  return t`${poolLabel} volume deposited over time`;
}
function description(props: TokenDetailPageProps) {
  const poolLabel = getPoolLabel(props.searchParams.pool);
  return t`The volume of deposited digital carbon credits in the ${poolLabel} pool over a given time period.`;
}

export async function generateMetadata(props: TokenDetailPageProps) {
  return {
    title: metaDataTitle(title(props)),
    description: description(props),
  };
}

export default async function TokenVolumeOverTimePage(
  props: TokenDetailPageProps
) {
  await initLayout(props.params);
  return (
    <TokenDetailsDetailPage
      pageTitle={title(props)}
      card={
        <PoolVolumeOverTimeCard
          isDetailPage={true}
          {...props.params}
          {...props.searchParams}
        />
      }
      overview={description(props)}
      {...props}
    />
  );
}
