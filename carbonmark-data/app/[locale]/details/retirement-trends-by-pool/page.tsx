import { t } from "@lingui/macro";
import KlimaDAORetirementsByPoolBarCard from "components/cards/retirementTrends/RetirementsByPoolBarCard";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByPoolDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by pool`}
      card={
        <KlimaDAORetirementsByPoolBarCard
          isDetailPage={true}
        ></KlimaDAORetirementsByPoolBarCard>
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
