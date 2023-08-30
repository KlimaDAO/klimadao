import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useBridgeInfo from "hooks/useBridgeInfo";

export default function TokenVolumeOverTimePage() {
  const { bridgeLabel } = useBridgeInfo();
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} Volume Over Time`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
