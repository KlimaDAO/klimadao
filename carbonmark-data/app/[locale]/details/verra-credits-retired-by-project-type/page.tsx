import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsRetiredByProjectTypePage() {
  return (
    <DetailPage
      pageTitle={t`Credits retired by project type`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
