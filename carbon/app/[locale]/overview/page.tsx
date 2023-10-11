import { t } from "@lingui/macro";
import VerraCreditsCard from "components/cards/overview/DailyVerraCreditsOverviewCard";
import layout from "theme/layout.module.scss";

import { PageHeader } from "components/PageHeader/PageHeader";
import DailyCarbonRetirementsCard from "components/cards/overview/DailyCarbonRetirementsCard";
import DailyCarbonSupplyOverviewCard from "components/cards/overview/DailyCarbonSupplyOverviewCard";
import HistoricalPriceCard from "components/cards/overview/HistoricalPriceCard";
import TokenizedCreditsByBridgeCard from "components/cards/overview/TokenizedCreditsByBridgeCard";
import TokensPriceCard from "components/cards/overview/TokensPriceCard";

/** Overview page (index/landing page) captured via rewrite in next.config.js*/
export default function OverviewPage() {
  return (
    <>
      <PageHeader
        title={t`State of the digital carbon market`}
        subheading={{
          href: "/overview/digital-carbon",
          label: t`What is digital carbon?`,
        }}
      />
      <div className={layout.twoColumns}>
        <div className={layout.cardStackedRows}>
          <div className={layout.cardRow}>
            <VerraCreditsCard className={layout.zIndexSeven}></VerraCreditsCard>
          </div>
          <div className={layout.cardRow}>
            <TokenizedCreditsByBridgeCard
              detailUrlPosition="bottom"
              className={layout.zIndexSix}
            ></TokenizedCreditsByBridgeCard>
            <HistoricalPriceCard
              className={layout.zIndexFive}
            ></HistoricalPriceCard>
          </div>
          <div className={layout.cardRow}>
            <DailyCarbonSupplyOverviewCard
              bottomOptionsPosition="left"
              className={layout.zIndexFour}
            ></DailyCarbonSupplyOverviewCard>
            <DailyCarbonRetirementsCard
              bottomOptionsPosition="left"
              className={layout.zIndexThree}
            ></DailyCarbonRetirementsCard>
          </div>
        </div>
        <div className={layout.cardStackedRows}>
          <TokensPriceCard className={layout.zIndexTwo}></TokensPriceCard>
        </div>
      </div>
    </>
  );
}
