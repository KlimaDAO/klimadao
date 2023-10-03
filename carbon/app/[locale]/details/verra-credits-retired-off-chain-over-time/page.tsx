import { t } from "@lingui/macro";
import DailyVerraCreditsCard from "components/cards/offVsOnChain/DailyVerraCreditsCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsRetiredOffChainOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Off-chain Verra credits retired over time`}
      card={<DailyVerraCreditsCard isDetailPage={true} status="retired" />}
      overview={t`Lorem Ipsum`}
    />
  );
}
