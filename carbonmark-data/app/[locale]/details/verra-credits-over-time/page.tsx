import { t } from "@lingui/macro";
import VerraCreditsCard from "components/cards/DailyCreditsCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Verra Credits Over Time`}
      card={<VerraCreditsCard isDetailPage={true}></VerraCreditsCard>}
      overview={t`Lorem Ipsum`}
      insights={{ content: t`Lorem Ipsum`, source: "ai" }}
    />
  );
}
