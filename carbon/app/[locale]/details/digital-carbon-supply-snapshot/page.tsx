import { t } from "@lingui/macro";
import DailyCarbonSupplyCard from "components/cards/overview/DailyCarbonSupplyOverviewCard";
import DetailPage from "components/pages/DetailPage";

export default function DigitalCarbonSupplyPage() {
  return (
    <DetailPage
      pageTitle={t`Digital carbon supply snapshot`}
      card={<DailyCarbonSupplyCard isDetailPage={true}></DailyCarbonSupplyCard>}
      overview={t`Lorem Ipsum`}
    />
  );
}
