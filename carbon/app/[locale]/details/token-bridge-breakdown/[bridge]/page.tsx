import { t } from "@lingui/macro";
import TokenPoolBreakdownCard from "components/cards/tokenDetails/TokenPoolBreakdownCard";
import TokenDetailsDetailPage from "components/pages/TokenDetailsDetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function TokenBridgeBreakdownPage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <TokenDetailsDetailPage
      bridge={params.bridge}
      pageTitle={t`Breakdown of ${bridgeLabel} pooled`}
      card={
        <TokenPoolBreakdownCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`A breakdown of the current supply of carbon credits bridged via ${bridgeLabel} and pooled into digital carbon pools.`}
    />
  );
}
