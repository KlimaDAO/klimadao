import { t } from "@lingui/macro";
import PoolVolumeOverTimeCard from "components/cards/tokenDetails/PoolVolumeOverTimeCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { BridgePageParams, TokenDetailPageProps } from "components/pages/props";
import { getBridgeLabel } from "lib/bridges";

function title(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`${bridgeLabel} volume retired over time`;
}
function description(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`The volume of retired digital carbon credits in ${bridgeLabel} digital carbon pools over a given time period.`;
}

export async function generateMetadata({ params }: TokenDetailPageProps) {
  return {
    title: title(params),
    description: description(params),
  };
}

export default function TokenVolumeOverTimePage(props: TokenDetailPageProps) {
  return (
    <TokenDetailsDetailPage
      pageTitle={title(props.params)}
      card={
        <PoolVolumeOverTimeCard
          isDetailPage={true}
          {...props.params}
          {...props.searchParams}
        />
      }
      overview={description(props.params)}
      {...props}
    />
  );
}
