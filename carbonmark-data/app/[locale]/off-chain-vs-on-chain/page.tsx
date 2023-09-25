import { t } from "@lingui/macro";
import { PageHeader } from "components/PageHeader/PageHeader";
import VerraCreditsBreakdownCard from "components/cards/offVsOnChain/VerraCreditsBreakdownCard";

import OffVsOnChainTab from "components/pages/offVsOnChain/OffVsOnChainTab";
import layout from "theme/layout.module.scss";

export default function OffVsOnChainPage() {
  const issuedCreditsTab = <OffVsOnChainTab status="issued" />;
  const retiredCreditsTab = <OffVsOnChainTab status="retired" />;
  return (
    <div>
      <PageHeader title={t`Off vs On-chain carbon`} />
      <div className={layout.cardStackedRows}>
        <div className={layout.cardRow}>
          <VerraCreditsBreakdownCard />
        </div>
      </div>
    </div>
  );
}
