import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";

export default function DigitalCarbonSupplyByBlockchainPage() {
  return (
    <DetailPage
      pageTitle={t`Digital Carbon Supply - By Blockchain`}
      chartTitle={t`Carbon Supply by BlockChain`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
