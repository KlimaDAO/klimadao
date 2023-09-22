import { t } from "@lingui/macro";
import { PageHeader } from "components/PageHeader/PageHeader";
import CarbonSupplyByBlockChainCard from "components/cards/supply/CarbonSupplyByBlockchainCard";
import CarbonSupplyQuickFactsCard from "components/cards/supply/CarbonSupplyQuickFactsCard";
import DailyCeloCarbonSupplyCard from "components/cards/supply/DailyCeloCarbonSupplyCard";
import DailyEthCarbonSupplyCard from "components/cards/supply/DailyEthCarbonSupplyCard";
import DailyEthRetirementsCard from "components/cards/supply/DailyEthRetirementsCard";
import DailyPolygonCarbonSupplyCard from "components/cards/supply/DailyPolygonCarbonSupplyCard";
import DailyPolygonRetirementsCard from "components/cards/supply/DailyPolygonRetirementsCard";
import layout from "theme/layout.module.scss";

export default function SupplyPage() {
  return (
    <div>
      <>
        <PageHeader title={t`Supply`} />
      </>
      <div className={layout.cardStackedRows}>
        <div className={layout.cardRow}>
          <CarbonSupplyQuickFactsCard />
          <CarbonSupplyByBlockChainCard />
        </div>
        <div className={layout.cardRow}>
          <DailyPolygonCarbonSupplyCard />
          <DailyPolygonRetirementsCard />
        </div>
        <div className={layout.cardRow}>
          <DailyEthCarbonSupplyCard />
          <DailyEthRetirementsCard />
        </div>
        <div className={layout.cardRow}>
          <div className={layout.card50percent}>
            <DailyCeloCarbonSupplyCard />
          </div>
        </div>
      </div>
    </div>
  );
}
