import { t } from "@lingui/macro";
import RetirementsByPoolBarCard from "components/cards/retirementTrends/RetirementsByPoolBarCard";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByPoolDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by pool`}
      card={<RetirementsByPoolBarCard isDetailPage={true} />}
      overview={t`Lorem Ipsum`}
    />
  );
}
