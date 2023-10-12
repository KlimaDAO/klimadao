import { t } from "@lingui/macro";
import VerraCreditsBreakdownCard from "components/cards/offVsOnChain/VerraCreditsBreakdownCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsBreakdownPage() {
  return (
    <DetailPage
      pageTitle={t`Verra credits breakdown`}
      card={<VerraCreditsBreakdownCard isDetailPage={true} />}
      overview={t`Lorem Ipsum`}
    />
  );
}
