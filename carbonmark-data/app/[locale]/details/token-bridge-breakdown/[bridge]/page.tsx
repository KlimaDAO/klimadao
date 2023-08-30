import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useBridgeInfo from "hooks/useBridgeInfo";

export default function TokenBridgeBreakdownPage() {
  const { bridgeLabel } = useBridgeInfo();
  return (
    <DetailPage
      pageTitle={t`Breakdown of ${bridgeLabel} Pooled`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
