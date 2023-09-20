import TokenDistributionOfMethodologiesCard from "components/cards/tokenDetails/TokenDistributionOfMethodologiesCard";
import TokenDistributionOfProjectsCard from "components/cards/tokenDetails/TokenDistributionOfProjectsCard";
import TokenDistributionOfVintageCard from "components/cards/tokenDetails/TokenDistributionOfVintageCard";
import TokenOriginsCard from "components/cards/tokenDetails/TokenOriginsCard";
import TokenStateOfDigitalCarbonCard from "components/cards/tokenDetails/TokenStateOfDigitalCarbonCard";
import TokenVolumeOverTimeCard from "components/cards/tokenDetails/TokenVolumeOverTimeCard";
import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import layout from "theme/layout.module.scss";
export default function TokenDetailsTab(props: TokenDetailsProps) {
  return (
    <div>
      <div className={layout.cardRow}>
        <TokenStateOfDigitalCarbonCard {...props} />
      </div>
      <div className={layout.cardRow}>
        <TokenVolumeOverTimeCard {...props} />
        <TokenDistributionOfVintageCard {...props} />
      </div>
      <div className={layout.cardRow}>
        <TokenDistributionOfMethodologiesCard {...props} />
        <TokenDistributionOfProjectsCard {...props} />
      </div>
      <div className={layout.cardRow}>
        <TokenOriginsCard {...props} />
      </div>
    </div>
  );
}
