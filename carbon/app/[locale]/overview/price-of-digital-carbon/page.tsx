import { t } from "@lingui/macro";
import HistoricalPriceCard from "components/cards/overview/HistoricalPriceCard";
import TokensPriceCard from "components/cards/overview/TokensPriceCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";
import layout from "theme/layout.module.scss";

export default function PriceOfDigitalCarbonPage() {
  return (
    <DetailPage
      pageTitle={t`Price of digital carbon`}
      card={
        <div className={layout.cardStackedRows}>
          <HistoricalPriceCard isDetailPage={true}></HistoricalPriceCard>
          <TokensPriceCard isDetailPage={true}></TokensPriceCard>
        </div>
      }
      overview={t`The prices of various digital carbon pool tokens and their selective costs charged by bridges to redeem or retire a specific underlying digital carbon credit token. Note: The chart shows MCO2 price data from the KLIMA/MCO2 pool launched in January 2022.`}
      backButtonHref={PageLinks.Overview}
    />
  );
}
