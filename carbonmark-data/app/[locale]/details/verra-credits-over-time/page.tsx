import { t } from "@lingui/macro";
import VerraCreditsCard from "components/cards/VerraCreditsCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Verra Credits Over Time`}
      chartTitle={t`Verra Credits`}
      chart={<VerraCreditsCard></VerraCreditsCard>}
      overview={t`Lorem Ipsum`}
    />
  );
}
