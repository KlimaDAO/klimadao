import { t } from "@lingui/macro";
import VerraCreditsCard from "components/cards/overview/DailyVerraCreditsOverviewCard";
import layout from "theme/layout.module.scss";

import { PageHeader } from "components/PageHeader/PageHeader";
import HistoricalPriceCard from "components/cards/HistoricalPriceCard";
import DailyCarbonRetirementsCard from "components/cards/overview/DailyCarbonRetirementsCard";
import DailyCarbonSupplyOverviewCard from "components/cards/overview/DailyCarbonSupplyOverviewCard";
import TokenizedCreditsByBridgeCard from "components/cards/overview/TokenizedCreditsByBridgeCard";
import TokensPriceCard from "components/cards/overview/TokensPriceCard";

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
            <DailyCarbonSupplyOverviewCard></DailyCarbonSupplyOverviewCard>
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
