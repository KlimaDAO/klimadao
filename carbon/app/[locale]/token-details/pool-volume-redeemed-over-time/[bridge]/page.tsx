import { t } from "@lingui/macro";
import PoolVolumeOverTimeCard from "components/cards/tokenDetails/PoolVolumeOverTimeCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { getPoolLabel } from "lib/pools";

function title(props: TokenDetailPageProps) {
  const poolLabel = getPoolLabel(props.searchParams.pool);
  return t`${poolLabel} volume redeemed over time`;
}
function description(props: TokenDetailPageProps) {
  const poolLabel = getPoolLabel(props.searchParams.pool);
  return t`The volume of redeemed digital carbon credits in the ${poolLabel} pool over a given time period.`;
}

export async function generateMetadata(props: TokenDetailPageProps) {
  return {
    title: title(props),
    description: description(props),
  };
}

export default function TokenVolumeOverTimePage(props: TokenDetailPageProps) {
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
