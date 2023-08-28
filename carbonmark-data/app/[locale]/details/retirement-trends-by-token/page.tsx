import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByTokenDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by Token`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
