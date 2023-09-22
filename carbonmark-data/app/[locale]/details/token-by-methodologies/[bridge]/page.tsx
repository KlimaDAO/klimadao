import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useBridgeInfo from "hooks/useBridgeInfo";

export default function TokenDistributionOfMethodologiesPage() {
  const { bridgeLabel } = useBridgeInfo();
  return (
    <DetailPage
      pageTitle={t`${bridgeLabel} distribution of methodologies`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
