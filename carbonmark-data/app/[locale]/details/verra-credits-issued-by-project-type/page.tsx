import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsIssuedByProjectTypePage() {
  return (
    <DetailPage
      pageTitle={t`Credits issued by project type`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
