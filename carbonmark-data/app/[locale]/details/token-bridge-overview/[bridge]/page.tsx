import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useBridgeInfo from "hooks/useBridgeInfo";

export default function TokenBridgeOverviewPage() {
  const { bridgeLabel } = useBridgeInfo();
  return (
    <DetailPage
      pageTitle={t`State of ${bridgeLabel} Digital Carbon`}
      chartTitle={t`${bridgeLabel} Overview`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
