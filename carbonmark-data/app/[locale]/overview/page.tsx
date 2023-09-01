import { t } from "@lingui/macro";
import VerraCreditsCard from "components/cards/DailyCreditsCard";
import layout from "theme/layout.module.scss";

import HistoricalPriceCard from "components/cards/HistoricalPriceCard";
import TokenizedCreditsByBridgeCard from "components/cards/TokenizedCreditsByBridgeCard";
import TokensPriceCard from "components/cards/TokensPriceCard";

/** Overview page (index/landing page) captured via rewrite in next.config.js*/
export default function OverviewPage() {
  return (
    <div>
      <h1>{t`State of the digital carbon market`}</h1>
      <div className={layout.twoColumns}>
        <div className={layout.cardStackedRows}>
          <div className={layout.cardRow}>
            <VerraCreditsCard></VerraCreditsCard>
          </div>
          <div className={layout.cardRow}>
            <TokenizedCreditsByBridgeCard></TokenizedCreditsByBridgeCard>
            <HistoricalPriceCard></HistoricalPriceCard>
          </div>
        </div>
        <div className={layout.cardStackedRows}>
        <TokensPriceCard></TokensPriceCard>
      </div>
      </div>
    </div>
  );
}
