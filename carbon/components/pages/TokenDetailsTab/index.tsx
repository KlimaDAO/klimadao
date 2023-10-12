import TokenDistributionOfMethodologiesCard from "components/cards/tokenDetails/TokenDistributionOfMethodologiesCard";
import TokenDistributionOfProjectsCard from "components/cards/tokenDetails/TokenDistributionOfProjectsCard";
import TokenDistributionOfVintageCard from "components/cards/tokenDetails/TokenDistributionOfVintageCard";
import TokenOriginsCard from "components/cards/tokenDetails/TokenOriginsCard";
import TokenPoolBreakdownCard from "components/cards/tokenDetails/TokenPoolBreakdownCard";
import TokenStateOfDigitalCarbonCard from "components/cards/tokenDetails/TokenStateOfDigitalCarbonCard";
import TokenVolumeOverTimeCard from "components/cards/tokenDetails/TokenVolumeOverTimeCard";
import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import layout from "theme/layout.module.scss";
export default function TokenDetailsTab(props: TokenDetailsProps) {
  return (
    <div>
      <div className={`${layout.cardRow} ${layout.cardRowWrap}`}>
        <TokenStateOfDigitalCarbonCard {...props} />
        <TokenPoolBreakdownCard {...props} />
        <TokenVolumeOverTimeCard {...props} />
        <TokenDistributionOfVintageCard {...props} />
        <TokenDistributionOfMethodologiesCard {...props} />
        <TokenDistributionOfProjectsCard {...props} />
        <TokenOriginsCard {...props} />
      </div>
    </div>
  );
}
