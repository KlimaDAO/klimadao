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
        <div></div>
        <div className={layout.cardRow}>
          <CarbonSupplyQuickFactsCard className={layout.zIndexSeven} />
          <CarbonSupplyByBlockChainCard className={layout.zIndexSix} />
        </div>
        <div className={layout.cardRow}>
          <DailyPolygonCarbonSupplyCard className={layout.zIndexFive} />
          <DailyPolygonRetirementsCard className={layout.zIndexFour} />
        </div>
        <div className={layout.cardRow}>
          <DailyEthCarbonSupplyCard className={layout.zIndexThree} />
          <DailyEthRetirementsCard className={layout.zIndexTwo} />
        </div>
        <div className={layout.cardRow}>
          <div className={layout.card50percent}>
            <DailyCeloCarbonSupplyCard className={layout.zIndexOne} />
          </div>
        </div>
      </div>
    </div>
  );
}
