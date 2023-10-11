import { t } from "@lingui/macro";
import { PageHeader } from "components/PageHeader/PageHeader";
import VerraCreditsBreakdownCard from "components/cards/offVsOnChain/VerraCreditsBreakdownCard";

import TokenizedCreditsByBridgeCard from "components/cards/overview/TokenizedCreditsByBridgeCard";
import OffVsOnChainClientWrapper from "components/pages/offVsOnChain/OffVsOnChainClientWrapper";
import OffVsOnChainTab from "components/pages/offVsOnChain/OffVsOnChainTab";
import layout from "theme/layout.module.scss";

export default function OffVsOnChainPage() {
  const issuedCreditsTab = <OffVsOnChainTab status="issued" />;
  const retiredCreditsTab = <OffVsOnChainTab status="all_retired" />;
  return (
    <div>
      <PageHeader title={t`Off vs On-chain carbon`} />
      <div className={layout.cardStackedRows}>
        <div className={`${layout.cardRow} ${layout.prioritizeFirstCard}`}>
          <VerraCreditsBreakdownCard className={layout.zIndexSeven} />
          <TokenizedCreditsByBridgeCard className={layout.zIndexSix} />
        </div>
      </div>
      <OffVsOnChainClientWrapper
        issuedCreditsTab={issuedCreditsTab}
        retiredCreditsTab={retiredCreditsTab}
      />
    </div>
  );
}
