import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsBreakdownPage() {
  return (
    <DetailPage
      pageTitle={t`Verra credits breakdown`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
