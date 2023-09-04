import { t } from "@lingui/macro";
import HistoricalPriceCard from "components/cards/HistoricalPriceCard";
import TokensPriceCard from "components/cards/TokensPriceCard";
import DetailPage from "components/pages/DetailPage";
import layout from "theme/layout.module.scss";

export default function PriceOfDigitalCarbonPage() {
  return (
    <DetailPage
      pageTitle={t`Price of Digital Carbon`}
      card={
        <div className={layout.cardStackedRows}>
          <HistoricalPriceCard></HistoricalPriceCard>
          <TokensPriceCard></TokensPriceCard>
        </div>
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
