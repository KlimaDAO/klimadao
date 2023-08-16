import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function VerraCreditsRetiredOffChainOverTimePage() {
  return (
    <DetailPage
      pageTitle={t`Off-Chain Verra Credits Retired Over Time`}
      chartTitle={t`Off-Chain Verra Credits Retired Over Time`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
