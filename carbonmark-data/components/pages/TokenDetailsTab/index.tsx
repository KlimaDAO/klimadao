import TokenDistributionOfProjectsCard from "components/cards/tokenDetails/TokenDistributionOfProjectsCard";
import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import layout from "theme/layout.module.scss";
export default function TokenDetailsTab(props: TokenDetailsProps) {
  return (
    <div>
      {/* Just a test for the card implementation. We have to develop the actual parameter widgets in the UI */}
      <div className={layout.cardRow}>
        <TokenDistributionOfProjectsCard
          {...props}
        ></TokenDistributionOfProjectsCard>
      </div>
    </div>
  );
}
