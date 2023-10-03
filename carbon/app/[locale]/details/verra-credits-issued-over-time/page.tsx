import { t } from "@lingui/macro";
import DailyVerraCreditsCard from "components/cards/offVsOnChain/DailyVerraCreditsCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsRetiredOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Verra credits retired over time`}
      card={<DailyVerraCreditsCard isDetailPage={true} status="issued" />}
      overview={t`Lorem Ipsum`}
    />
  );
}
