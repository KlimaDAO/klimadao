import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByChainDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by chain`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
