import TokenDistributionOfProjectsCard from "components/cards/tokenDetails/TokenDistributionOfProjectsCard";
import TokenVolumeOverTimeCard from "components/cards/tokenDetails/TokenVolumeOverTimeCard";
import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import layout from "theme/layout.module.scss";
export default function TokenDetailsTab(props: TokenDetailsProps) {
  return (
    <div>
      <div className={layout.cardRow}>
        <TokenVolumeOverTimeCard {...props} />
      </div>
      <div className={layout.cardRow}>
        <TokenDistributionOfProjectsCard {...props} />
      </div>
    </div>
  );
}
