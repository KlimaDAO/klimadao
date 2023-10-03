import { t } from "@lingui/macro";
import HistoricalPriceCard from "components/cards/overview/HistoricalPriceCard";
import TokensPriceCard from "components/cards/overview/TokensPriceCard";
import DetailPage from "components/pages/DetailPage";
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
      overview={t`Lorem Ipsum`}
    />
  );
}
