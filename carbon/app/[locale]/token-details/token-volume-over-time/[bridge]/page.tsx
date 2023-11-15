import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import TokenVolumeOverTimeCard from "components/cards/tokenDetails/TokenVolumeOverTimeCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { BridgePageParams, TokenDetailPageProps } from "components/pages/props";
import { getBridgeLabel } from "lib/bridges";

function title(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`${bridgeLabel} volume over time`;
}
function description(params: BridgePageParams) {
  const bridgeLabel = getBridgeLabel(params.bridge);
  return t`The volume of digital carbon credits in ${bridgeLabel} digital carbon pools over a given time period.`;
}

export async function generateMetadata({ params }: TokenDetailPageProps) {
  return {
    title: metaDataTitle(title(params)),
    description: description(params),
  };
}

export default async function TokenVolumeOverTimePage(
  props: TokenDetailPageProps
) {
  await initLayout(props.params);

  return (
    <TokenDetailsDetailPage
      pageTitle={title(props.params)}
      card={
        <TokenVolumeOverTimeCard
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
