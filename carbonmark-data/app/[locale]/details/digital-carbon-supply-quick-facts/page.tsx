import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function DigitalCarbonSupplyQuickFactsPage() {
  return (
    <DetailPage
      pageTitle={t`Digital Carbon Supply - Quick Facts`}
      chartTitle={t`Quick facts`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
