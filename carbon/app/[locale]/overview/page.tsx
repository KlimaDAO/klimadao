import { t } from "@lingui/macro";
import VerraCreditsCard from "components/cards/overview/DailyVerraCreditsOverviewCard";
import layout from "theme/layout.module.scss";

import { PageHeader } from "components/PageHeader/PageHeader";
import DailyCarbonRetirementsCard from "components/cards/overview/DailyCarbonRetirementsCard";
import DailyCarbonSupplyOverviewCard from "components/cards/overview/DailyCarbonSupplyOverviewCard";
import HistoricalPriceCard from "components/cards/overview/HistoricalPriceCard";
import TokenizedCreditsByBridgeCard from "components/cards/overview/TokenizedCreditsByBridgeCard";
import TokensPriceCard from "components/cards/overview/TokensPriceCard";
import { LocalizedPageProps } from "components/pages/props";
import { initLayout, metaDataTitle } from "../layout";

function title() {
  return t`State of the digital carbon market`;
}
function description() {
  return t`The Klima Data Carbon Dashboard provides a complete overview of digital carbon pricing, volumes, and retirement trends for the Digital Carbon Market. It is made available to anyone by KlimaDAO as a public good, creating transparency for the DCM.`;
}

export async function generateMetadata() {
  return {
    title: metaDataTitle(title()),
    description: description(),
  };
}

/** Overview page (index/landing page) captured by app/[locale]/page.tsx */
export default async function OverviewPage(props: LocalizedPageProps) {
  await initLayout(props.params);
  return (
    <>
      <PageHeader
        title={title()}
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
              sourceHref={"/overview"}
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
