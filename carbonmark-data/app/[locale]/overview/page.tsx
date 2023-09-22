import { t } from "@lingui/macro";
import VerraCreditsCard from "components/cards/DailyCreditsCard";
import layout from "theme/layout.module.scss";

import DailyCarbonRetirementsCard from "components/cards/DailyCarbonRetirementsCard";
import DailyCarbonSupplyCard from "components/cards/DailyCarbonSupplyCard";
import HistoricalPriceCard from "components/cards/HistoricalPriceCard";
import TokenizedCreditsByBridgeCard from "components/cards/TokenizedCreditsByBridgeCard";
import TokensPriceCard from "components/cards/TokensPriceCard";
import { PageHeader } from "components/PageHeader/PageHeader";

/** Overview page (index/landing page) captured via rewrite in next.config.js*/
export default function OverviewPage() {
  return (
    <div>
      <PageHeader
        title={t`State of the digital carbon market`}
        subheading={{
          href: "/",
          label: t`What is digital carbon?`,
        }}
      />
      <div className={layout.twoColumns}>
        <div className={layout.cardStackedRows}>
          <div className={layout.cardRow}>
            <VerraCreditsCard></VerraCreditsCard>
          </div>
          <div className={layout.cardRow}>
            <TokenizedCreditsByBridgeCard></TokenizedCreditsByBridgeCard>
            <HistoricalPriceCard></HistoricalPriceCard>
          </div>
          <div className={layout.cardRow}>
            <DailyCarbonSupplyCard></DailyCarbonSupplyCard>
            <DailyCarbonRetirementsCard></DailyCarbonRetirementsCard>
          </div>
        </div>
        <div className={layout.cardStackedRows}>
          <TokensPriceCard></TokensPriceCard>
        </div>
      </div>
    </div>
  );
}
