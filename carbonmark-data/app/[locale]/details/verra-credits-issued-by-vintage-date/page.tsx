import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsIssuedByVintagePage() {
  return (
    <DetailPage
      pageTitle={t`Credits issued by vintage start date`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
