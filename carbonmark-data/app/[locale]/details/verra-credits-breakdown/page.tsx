import { t } from "@lingui/macro";
import HistoricalPriceCard from "components/cards/HistoricalPriceCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsBreakdownPage() {
  return (
    <DetailPage
      pageTitle={t`Price of Digital Carbon`}
      chartTitle={t`Historical Price`}
      chart={<HistoricalPriceCard></HistoricalPriceCard>}
      overview={t`Lorem Ipsum`}
    />
  );
}
