import { t } from "@lingui/macro";
import DailyVerraCreditsCard from "components/cards/offVsOnChain/DailyVerraCreditsCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

export default function VerraCreditsRetiredOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Verra credits retired over time`}
      card={<DailyVerraCreditsCard isDetailPage={true} status="issued" />}
      overview={t`The total number of carbon credits issued by carbon registry Verra that have been retired over time.`}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
