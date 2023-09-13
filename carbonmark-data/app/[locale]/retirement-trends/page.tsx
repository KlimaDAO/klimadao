import RetirementTrendsPage from "components/pages/RetirementTrendsPage";
import RetirementTrendsByBeneficiaryTab from "components/tabs/RetirementTrendsByBeneficiaryTab";
import RetirementTrendsByChainTab from "components/tabs/RetirementTrendsByChainTab";
import RetirementTrendsByPoolTab from "components/tabs/RetirementTrendsByPoolTab";
import RetirementTrendsByTokenTab from "components/tabs/RetirementTrendsByTokenTab";

/** Retirement Trends Page
 * Uses a Client Component (RetirementTrendsPage) to handle tab navigation
 * Tabs are actually Components rendered Server side passed to the Client Component as props
 */
export default function RetirementTrends() {
  return (
    <RetirementTrendsPage
      RetirementTrendsByPoolTab={<RetirementTrendsByPoolTab />}
      RetirementTrendsByChainTab={<RetirementTrendsByChainTab />}
      RetirementTrendsByTokenTab={<RetirementTrendsByTokenTab />}
      RetirementTrendsByBeneficiaryTab={<RetirementTrendsByBeneficiaryTab />}
    ></RetirementTrendsPage>
  );
}
