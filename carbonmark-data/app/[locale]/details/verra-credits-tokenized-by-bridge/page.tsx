import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsTokenizedByBridgePage() {
  return (
    <DetailPage
      pageTitle={t`Tokenized Credits by Bridge`}
      chartTitle={t`Tokenized Credits by Bridge`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
