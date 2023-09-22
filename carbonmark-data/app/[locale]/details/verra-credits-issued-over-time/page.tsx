import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsIssuedOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Verra credits issued over time`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
