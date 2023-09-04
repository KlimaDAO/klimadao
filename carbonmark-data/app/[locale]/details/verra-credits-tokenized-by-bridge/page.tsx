import { t } from "@lingui/macro";
import TokenizedCreditsByBridgeCard from "components/cards/TokenizedCreditsByBridgeCard";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsTokenizedByBridgePage() {
  return (
    <DetailPage
      pageTitle={t`Tokenized Credits by Bridge`}
      card={<TokenizedCreditsByBridgeCard></TokenizedCreditsByBridgeCard>}
      overview={t`Lorem Ipsum`}
    />
  );
}
