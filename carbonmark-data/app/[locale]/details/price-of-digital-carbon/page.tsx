import { t } from "@lingui/macro";
import HistoricalPriceCard from "components/cards/HistoricalPriceCard";
import DetailPage from "components/pages/DetailPage";

export default function PriceOfDigitalCarbonPage() {
  return (
    <DetailPage
      pageTitle={t`Price of Digital Carbon`}
      card={<HistoricalPriceCard></HistoricalPriceCard>}
      overview={t`Lorem Ipsum`}
    />
  );
}
