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
        <TokenStateOfDigitalCarbonCard
          {...props}
          className={layout.zIndexSeven}
        />
        <TokenPoolBreakdownCard {...props} className={layout.zIndexSix} />
        <TokenVolumeOverTimeCard {...props} className={layout.zIndexFive} />
        <TokenDistributionOfVintageCard
          {...props}
          className={layout.zIndexFour}
        />
        <TokenDistributionOfMethodologiesCard
          {...props}
          className={layout.zIndexThree}
        />
        <TokenDistributionOfProjectsCard
          {...props}
          className={layout.zIndexTwo}
        />
        <TokenOriginsCard {...props} className={layout.zIndexOne} />
      </div>
    </div>
  );
}
