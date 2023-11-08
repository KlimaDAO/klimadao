import { t } from "@lingui/macro";
import { PageHeader } from "components/PageHeader/PageHeader";
import VerraCreditsBreakdownCard from "components/cards/offVsOnChain/VerraCreditsBreakdownCard";

import TokenizedCreditsByBridgeCard from "components/cards/overview/TokenizedCreditsByBridgeCard";
import OffVsOnChainClientWrapper from "components/pages/offVsOnChain/OffVsOnChainClientWrapper";
import OffVsOnChainTab from "components/pages/offVsOnChain/OffVsOnChainTab";
import { PageLinks } from "lib/PageLinks";
import layout from "theme/layout.module.scss";
import styles from "./styles.module.scss";

function title() {
  return t`Off vs On-chain carbon`;
}
function description() {
  return t`Off vs On-chain carbon`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

export default function OffVsOnChainPage() {
  const issuedCreditsTab = <OffVsOnChainTab status="issued" />;
  const retiredCreditsTab = <OffVsOnChainTab status="all_retired" />;
  return (
    <div>
      <PageHeader title={title()} />
      <div className={layout.cardStackedRows}>
        <div
          className={`${layout.cardRow} ${layout.prioritizeFirstCard} ${styles.firstRow}`}
        >
          <VerraCreditsBreakdownCard className={layout.zIndexSeven} />
          <TokenizedCreditsByBridgeCard
            className={layout.zIndexSix}
            sourceHref={PageLinks.OffChainVsOnChain}
          />
        </div>
      </div>
      <OffVsOnChainClientWrapper
        issuedCreditsTab={issuedCreditsTab}
        retiredCreditsTab={retiredCreditsTab}
      />
    </div>
  );
}
