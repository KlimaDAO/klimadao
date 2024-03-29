import { t } from "@lingui/macro";
import { PageHeader } from "components/PageHeader/PageHeader";
import CarbonSupplyByBlockChainCard from "components/cards/supply/CarbonSupplyByBlockchainCard";
import CarbonSupplyQuickFactsCard from "components/cards/supply/CarbonSupplyQuickFactsCard";
import DailyCeloCarbonSupplyCard from "components/cards/supply/DailyCeloCarbonSupplyCard";
import DailyEthCarbonSupplyCard from "components/cards/supply/DailyEthCarbonSupplyCard";
import DailyEthRetirementsCard from "components/cards/supply/DailyEthRetirementsCard";
import DailyPolygonCarbonSupplyCard from "components/cards/supply/DailyPolygonCarbonSupplyCard";
import DailyPolygonRetirementsCard from "components/cards/supply/DailyPolygonRetirementsCard";
import { LocalizedPageProps } from "components/pages/props";
import layout from "theme/layout.module.scss";
import { initLayout, metaDataTitle } from "../layout";

function title() {
  return t`Supply`;
}
function description() {
  return t`Explore digital carbon supply on Polygon, Ethereum, Celo and more using the Klima Data Carbon Dashboard.`;
}

export async function generateMetadata() {
  return {
    title: metaDataTitle(title()),
    description: description(),
  };
}

export default async function SupplyPage(props: LocalizedPageProps) {
  await initLayout(props.params);

  return (
    <div>
      <>
        <PageHeader title={title()} />
      </>
      <div className={layout.cardStackedRows}>
        <div></div>
        <div className={layout.cardRow}>
          <CarbonSupplyQuickFactsCard
            className={`${layout.zIndexSeven} ${layout.card66percent}`}
          />
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
