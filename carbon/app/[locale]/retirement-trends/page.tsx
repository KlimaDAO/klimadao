import { t } from "@lingui/macro";
import PageWithTabs from "components/pages/PageWithTabs";
import { LocalizedPageProps } from "components/pages/props";
import RetirementTrendsByBeneficiaryTab from "components/pages/retirementTrends/RetirementTrendsByBeneficiaryTab";
import RetirementTrendsByChainTab from "components/pages/retirementTrends/RetirementTrendsByChainTab";
import RetirementTrendsByPoolTab from "components/pages/retirementTrends/RetirementTrendsByPoolTab";
import RetirementTrendsByTokenTab from "components/pages/retirementTrends/RetirementTrendsByTokenTab";
import { initLayout, metaDataTitle } from "../layout";

function title() {
  return t`Retirement trends`;
}
function description() {
  return t`Explore digital carbon retirement trends by public blockhchain, digtial carbon token, and retirement beneficiary using the Klima Data Carbon Dashboard.`;
}

export async function generateMetadata() {
  return {
    title: metaDataTitle(title()),
    description: description(),
  };
}

/** Retirement Trends Page
 * Uses a Client Component (PageWithTabs) to handle tab navigation
 * Tabs are actually Components rendered Server side passed to the Client Component as props
 */
export default async function RetirementTrends(props: LocalizedPageProps) {
  await initLayout(props.params);
  return (
    <PageWithTabs
      title={title()}
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
