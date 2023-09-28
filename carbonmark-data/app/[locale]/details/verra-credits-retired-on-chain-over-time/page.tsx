import { t } from "@lingui/macro";
import DailyCarbonSupplyByProtocolCard from "components/cards/offVsOnChain/DailyCarbonSupplyByProtocolCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsRetiredOnChainOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`On-chain Verra credits retired over time`}
      card={
        <DailyCarbonSupplyByProtocolCard isDetailPage={true} status="retired" />
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
