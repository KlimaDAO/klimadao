import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useChainInfo from "hooks/useChainInfo";

export default function DigitalCarbonSupplyPage() {
  const { chainLabel } = useChainInfo();
  return (
    <DetailPage
      pageTitle={t`Digital Carbon Supply - ${chainLabel}`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
