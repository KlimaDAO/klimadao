import { t } from "@lingui/macro";
import KlimaDAORetirementsByPoolBarCard from "components/cards/KlimaDAORetirementsByPoolBarCard";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByPoolDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by Pool`}
      card={
        <KlimaDAORetirementsByPoolBarCard></KlimaDAORetirementsByPoolBarCard>
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
