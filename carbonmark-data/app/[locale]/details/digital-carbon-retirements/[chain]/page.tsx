import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import useChainInfo from "hooks/useChainInfo";

export default function DigitalCarbonRetirementsPage() {
  const { chainLabel } = useChainInfo();
  return (
    <DetailPage
      pageTitle={t`Digital carbon retirements - ${chainLabel}`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
