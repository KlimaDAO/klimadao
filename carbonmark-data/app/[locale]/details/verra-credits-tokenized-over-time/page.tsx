import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsTokenizedOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Verra Credits Tokenized Over Time`}
      chartTitle={t`Cummulative Verra Registry Credits Tokenized Over Time`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
