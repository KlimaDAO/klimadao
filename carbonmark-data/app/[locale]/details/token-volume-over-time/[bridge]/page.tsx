import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useBridgeInfo from "hooks/useBridgeInfo";

export default function TokenVolumeOverTimePage() {
  const { bridgeLabel } = useBridgeInfo();
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} volume over time`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
