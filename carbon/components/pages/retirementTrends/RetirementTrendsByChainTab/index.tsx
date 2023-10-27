import RetirementsByChainChartCard from "components/cards/retirementTrends/RetirementsByChainChartCard";
import RetirementsByChainListCard from "components/cards/retirementTrends/RetirementsByChainListCard";
import RetirementsByChainOverviewCard from "components/cards/retirementTrends/RetirementsByChainOverviewCard";
import layout from "theme/layout.module.scss";

/**
 * A UI layout component to position Retirement Trends pages content
 */
export default function RetirementTrendsByChainTab() {
  return (
    <div className={layout.cardStackedRows}>
      <div className={layout.cardRow}>
        <RetirementsByChainChartCard
          key={0}
          className={`${layout.zIndexSeven} ${layout.card66percent}`}
        />
        ,
        <RetirementsByChainOverviewCard key={0} className={layout.zIndexFive} />
        ,
      </div>
      <div className={layout.cardRow}>
        <RetirementsByChainListCard key={1} className={layout.zIndexSix} />,
      </div>
    </div>
  );
}
