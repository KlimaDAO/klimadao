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
      overview={t`The total number of carbon credits issued by carbon registry Verra and retired over time. On-chain refers to credits bridged and tokenized on a public blockchain.`}
    />
  );
}
