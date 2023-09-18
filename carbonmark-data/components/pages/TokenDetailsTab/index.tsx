import TokenDistributionOfProjectsCard from "components/cards/TokenDistributionOfProjectsCard";
import layout from "theme/layout.module.scss";
export default function TokenDetailsTab() {
  return (
    <div>
      {/* Just a test for the card implementation. We have to develop the actual parameter widgets in the UI */}
      <div className={layout.cardRow}>
        <TokenDistributionOfProjectsCard bridge="toucan"></TokenDistributionOfProjectsCard>
      </div>
    </div>
  );
}
