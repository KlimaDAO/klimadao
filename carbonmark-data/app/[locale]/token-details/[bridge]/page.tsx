import { t } from "@lingui/macro";
import TokenDistributionOfProjectsCard from "components/cards/TokenDistributionOfProjectsCard";

export default function TokenDetailsPage() {
  return (
    <div>
      <h1>{t`Token details`}</h1>
      {/* Just a test for the card implementation. We have to develop the actual parameter widgets in the UI */}
      <TokenDistributionOfProjectsCard bridge="toucan"></TokenDistributionOfProjectsCard>
    </div>
  );
}
