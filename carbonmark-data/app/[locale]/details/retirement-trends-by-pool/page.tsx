import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByPoolDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by Pool`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
