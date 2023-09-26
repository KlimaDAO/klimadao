import { t } from "@lingui/macro";
import DailyVerraCreditsCard from "components/cards/DailyCreditsCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Verra credits over time`}
      card={<DailyVerraCreditsCard isDetailPage={true}></DailyVerraCreditsCard>}
      overview={t`Lorem Ipsum`}
      insights={{ content: t`Lorem Ipsum`, source: "ai" }}
    />
  );
}
