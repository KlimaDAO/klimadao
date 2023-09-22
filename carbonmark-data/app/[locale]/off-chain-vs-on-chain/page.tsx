import { t } from "@lingui/macro";
import { PageHeader } from "components/PageHeader/PageHeader";
import DailyCarbonSupplyByProtocolCard from "components/cards/offVsOnChain/DailyCarbonSupplyByProtocolCard";
import TokenizedCreditsByBridgeCard from "components/cards/overview/TokenizedCreditsByBridgeCard";
import layout from "theme/layout.module.scss";

export default function OffVsOnChainPage() {
  return (
    <div>
      <PageHeader title={t`Off vs On-chain carbon`} />
      <div className={layout.cardStackedRows}>
        <div className={layout.cardRow}>
          <TokenizedCreditsByBridgeCard></TokenizedCreditsByBridgeCard>
        </div>
        <div className={layout.cardRow}>
          <DailyCarbonSupplyByProtocolCard></DailyCarbonSupplyByProtocolCard>
        </div>
        <div className={layout.cardRow}></div>
        <div className={layout.cardRow}></div>
      </div>
    </div>
  );
}
