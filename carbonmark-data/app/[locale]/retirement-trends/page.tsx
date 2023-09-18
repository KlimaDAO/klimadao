import { t } from "@lingui/macro";
import PageWithTabs from "components/pages/PageWithTabs";
import RetirementTrendsByBeneficiaryTab from "components/pages/retirementTrends/RetirementTrendsByBeneficiaryTab";
import RetirementTrendsByChainTab from "components/pages/retirementTrends/RetirementTrendsByChainTab";
import RetirementTrendsByPoolTab from "components/pages/retirementTrends/RetirementTrendsByPoolTab";
import RetirementTrendsByTokenTab from "components/pages/retirementTrends/RetirementTrendsByTokenTab";
/** Retirement Trends Page
 * Uses a Client Component (RetirementTrendsPage) to handle tab navigation
 * Tabs are actually Components rendered Server side passed to the Client Component as props
 */
export default function RetirementTrends() {
  return (
    <PageWithTabs
      tabs={[
        {
          key: "byPool",
          label: t`By pool`,
          content: <RetirementTrendsByPoolTab />,
        },
        {
          key: "byToken",
          label: t`By token`,
          content: <RetirementTrendsByTokenTab />,
        },
        {
          key: "byChain",
          label: t`By chain`,
          content: <RetirementTrendsByChainTab />,
        },
        {
          key: "byBeneficiary",
          label: t`By beneficiary`,
          content: <RetirementTrendsByBeneficiaryTab />,
        },
      ]}
    />
  );
}
