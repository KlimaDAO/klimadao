import { t } from "@lingui/macro";
import CarbonSupplyByBlockChainCard from "components/cards/supply/CarbonSupplyByBlockchainCard";
import DailyCeloCarbonSupplyCard from "components/cards/supply/DailyCeloCarbonSupplyCard";
import DailyEthCarbonSupplyCard from "components/cards/supply/DailyEthCarbonSupplyCard";
import DailyEthRetirementsCard from "components/cards/supply/DailyEthRetirementsCard";
import DailyPolygonCarbonSupplyCard from "components/cards/supply/DailyPolygonCarbonSupplyCard";
import DailyPolygonRetirementsCard from "components/cards/supply/DailyPolygonRetirementsCard";
import layout from "theme/layout.module.scss";

export default function SupplyPage() {
  return (
    <div>
      <h1>{t`Supply`}</h1>
      <div className={layout.cardStackedRows}>
        <div></div>
        <div className={layout.cardRow}>
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
          <DailyCeloCarbonSupplyCard />
        </div>
      </div>
    </div>
  );
}
