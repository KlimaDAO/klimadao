import { t } from "@lingui/macro";
import TokenPoolBreakdownCard from "components/cards/tokenDetails/TokenPoolBreakdownCard";
import DetailPage from "components/pages/DetailPage";
import { TokenDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function TokenBridgeBreakdownPage({
  params,
  searchParams,
}: TokenDetailPageProps) {
  const bridgeLabel = capitalize(params.bridge);
  return (
    <DetailPage
      pageTitle={t`Breakdown of ${bridgeLabel} pooled`}
      card={
        <TokenPoolBreakdownCard
          isDetailPage={true}
          {...params}
          {...searchParams}
        />
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
