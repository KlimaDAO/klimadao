import { t } from "@lingui/macro";
import CarbonSupplyByBlockChainCard from "components/cards/supply/CarbonSupplyByBlockchainCard";
import layout from "theme/layout.module.scss";

export default function SupplyPage() {
  return (
    <div>
      <h1>{t`Supply`}</h1>
      <div className={layout.cardStackedRows}>
        <div className={layout.cardRow}>
          <CarbonSupplyByBlockChainCard />
        </div>
        <div className={layout.cardRow}></div>
        <div className={layout.cardRow}></div>
        <div className={layout.cardRow}></div>
      </div>
    </div>
  );
}
