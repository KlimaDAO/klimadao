import RetirementTrendsByBeneficiaryTab from "components/pages/retirementTrends/RetirementTrendsByBeneficiaryTab";
import RetirementTrendsByChainTab from "components/pages/retirementTrends/RetirementTrendsByChainTab";
import RetirementTrendsByPoolTab from "components/pages/retirementTrends/RetirementTrendsByPoolTab";
import RetirementTrendsByTokenTab from "components/pages/retirementTrends/RetirementTrendsByTokenTab";
import RetirementTrendsPage from "components/pages/retirementTrends/RetirementTrendsPage";
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
