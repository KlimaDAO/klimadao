import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useBridgeInfo from "hooks/useBridgeInfo";

export default function TokenDistributionOfVintageDatePage() {
  const { bridgeLabel } = useBridgeInfo();
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} Distribution of Vintage Start Dates`}
      chartTitle={t`${bridgeLabel} Distribution of Vintage Start Dates`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
