import { t } from "@lingui/macro";
import DetailPage from "components/pages/DetailPage";
import { ChainDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function DigitalCarbonRetirementsPage({
  params,
}: ChainDetailPageProps) {
  const chainLabel = capitalize(params.chain);
  return (
    <DetailPage
      pageTitle={t`Digital Carbon Retirements - ${chainLabel}`}
      card={<></>}
      overview={t`Lorem Ipsum`}
    />
  );
}
