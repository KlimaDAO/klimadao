import { t } from "@lingui/macro";
import CarbonSupplyByBlockChainCard from "components/cards/supply/CarbonSupplyByBlockchainCard";
import CeloCarbonSupplyCard from "components/cards/supply/CeloCarbonSupplyCard";
import EthCarbonSupplyCard from "components/cards/supply/EthCarbonSupplyCard";
import PolygonCarbonSupplyCard from "components/cards/supply/PolygonCarbonSupplyCard";
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
          <PolygonCarbonSupplyCard />
        </div>
        <div className={layout.cardRow}>
          <EthCarbonSupplyCard />
        </div>
        <div className={layout.cardRow}>
          <CeloCarbonSupplyCard />
        </div>
      </div>
    </div>
  );
}
