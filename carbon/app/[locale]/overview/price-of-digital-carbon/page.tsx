import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import HistoricalPriceCard from "components/cards/overview/HistoricalPriceCard";
import TokensPriceCard from "components/cards/overview/TokensPriceCard";
import DetailPage from "components/pages/DetailPage";
import { LocalizedPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import layout from "theme/layout.module.scss";

function title() {
  return t`Price of digital carbon`;
}
function description() {
  return t`The prices of various digital carbon pool tokens and their selective costs charged by bridges to redeem or retire a specific underlying digital carbon credit token. Note: The chart shows MCO2 price data from the KLIMA/MCO2 pool launched in January 2022.`;
}

export async function generateMetadata() {
  return {
    title: metaDataTitle(title()),
    description: description(),
  };
}

export default async function PriceOfDigitalCarbonPage(
  props: LocalizedPageProps
) {
  await initLayout(props.params);
  return (
    <DetailPage
      pageTitle={title()}
      card={
        <div className={layout.cardStackedRows}>
          <HistoricalPriceCard isDetailPage={true}></HistoricalPriceCard>
          <TokensPriceCard isDetailPage={true}></TokensPriceCard>
        </div>
      }
      overview={description()}
      backButtonHref={PageLinks.Overview}
    />
  );
}
