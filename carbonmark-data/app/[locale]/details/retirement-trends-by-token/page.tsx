import { t } from "@lingui/macro";
import KlimaDAORetirementsByTokenBarCard from "components/cards/retirementTrends/KlimaDAORetirementsByTokenBarCard";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByTokenDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by token`}
      card={
        <KlimaDAORetirementsByTokenBarCard
          isDetailPage={true}
        ></KlimaDAORetirementsByTokenBarCard>
      }
      overview={t`Lorem Ipsum`}
    />
  );
}
