import { t } from "@lingui/macro";
import RetirementsByTokenBarCard from "components/cards/retirementTrends/RetirementsByTokenBarCard";
import DetailPage from "components/pages/DetailPage";

export default function RetirementTrendsByTokenDetailPage() {
  return (
    <DetailPage
      pageTitle={t`Retirements by token`}
      card={<RetirementsByTokenBarCard isDetailPage={true} />}
      overview={t`The percentage of retirements via infrastructure built by KlimaDAO from each digital carbon token in a given period.`}
    />
  );
}
