import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useBridgeInfo from "hooks/useBridgeInfo";

export default function TokenDistributionOfProjectsPage() {
  const { bridgeLabel } = useBridgeInfo();
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} Distribution of Projects`}
      chartTitle={t`${bridgeLabel} Distribution of Projects`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
