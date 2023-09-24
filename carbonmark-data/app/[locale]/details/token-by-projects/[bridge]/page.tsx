import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useBridgeInfo from "hooks/useBridgeInfo";

export default function TokenDistributionOfProjectsPage() {
  const { bridgeLabel } = useBridgeInfo();
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} distribution of projects`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
