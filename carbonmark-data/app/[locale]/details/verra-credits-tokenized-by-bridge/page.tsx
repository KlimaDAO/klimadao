import { t } from "@lingui/macro";
import TokenizedCreditsByBridgeCard from "components/cards/overview/TokenizedCreditsByBridgeCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsTokenizedByBridgePage() {
  return (
    <DetailPage
      pageTitle={t`Tokenized credits by bridge`}
      card={
        <TokenizedCreditsByBridgeCard
          isDetailPage={true}
        ></TokenizedCreditsByBridgeCard>
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
