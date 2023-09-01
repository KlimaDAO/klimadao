import { t } from "@lingui/macro";
import TokensPriceCard from "components/cards/TokensPriceCard";
import DetailPage from "components/pages/DetailPage";

export default function PriceOfDigitalCarbonPage() {
  return (
    <DetailPage
      pageTitle={t`Price of Digital Carbon`}
      card={<TokensPriceCard></TokensPriceCard>}
      overview={t`Lorem Ipsum`}
    />
  );
}
