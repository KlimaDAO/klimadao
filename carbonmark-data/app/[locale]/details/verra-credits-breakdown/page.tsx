import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsBreakdownPage() {
  return (
    <DetailPage
      pageTitle={t`Verra Credits Breakdown`}
      chartTitle={t`Verra Credits Breakdown`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
