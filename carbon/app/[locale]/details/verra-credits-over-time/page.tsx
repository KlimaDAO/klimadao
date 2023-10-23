import { t } from "@lingui/macro";
import DailyVerraCreditsCard from "components/cards/overview/DailyVerraCreditsOverviewCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Verra credits over time`}
      card={<DailyVerraCreditsCard isDetailPage={true}></DailyVerraCreditsCard>}
      overview={t`The total number of carbon credits issued by carbon registry Verra over time and the number of credits retired over time. On-chain refers to credits bridged and tokenized on a public blockchain.`}
      insights={{ content: t`Lorem Ipsum`, source: "ai" }}
    />
  );
}
