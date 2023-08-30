import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useChainInfo from "hooks/useChainInfo";

export default function DigitalCarbonSupplyPage() {
  const { chainLabel } = useChainInfo();
  return (
    <DetailPage
      pageTitle={t`Digital Carbon Supply - ${chainLabel}`}
      chartTitle={t`${chainLabel} Supply`}
      chart={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
