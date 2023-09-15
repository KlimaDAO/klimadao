import { t } from "@lingui/macro";
import DailyCarbonRetirementsCard from "components/cards/DailyCarbonRetirementsCard";
import DetailPage from "components/pages/DetailPage";

export default function DigitalCarbonRetirementsPage() {
  return (
    <DetailPage
      pageTitle={t`Digital carbon retirements snapshot`}
      card={
        <DailyCarbonRetirementsCard
          isDetailPage={true}
        ></DailyCarbonRetirementsCard>
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
