import RetirementTrendsPage from "components/pages/RetirementTrendsPage";
import layout from "theme/layout.module.scss";

export default function RetirementTrendsByTokenPage() {
  return (
    <RetirementTrendsPage>
      <div className={layout.twoColumns}>
        <div className={layout.cardStackedRows}>
          <div className={layout.cardRow}>KlimaDAO Retirements by Pool</div>
          <div className={layout.cardRow}>KlimaDAO Retirements by Pool</div>
          <div className={layout.cardRow}>
            Detailed list of KlimaDAO Retirements
          </div>
        </div>
        <div className={layout.cardStackedRows}>
          Carbon Pool Redemptions / Retirements
        </div>
      </div>
    </RetirementTrendsPage>
  );
}
