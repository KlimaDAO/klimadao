import { t } from "@lingui/macro";
import PageWithTabs from "components/pages/PageWithTabs";
import TokenDetailsTab from "components/pages/TokenDetailsTab";
import { getC3TokensOptions, getToucanTokensOptions } from "lib/charts/options";
/** Retirement Trends Page
 * Uses a Client Component (RetirementTrendsPage) to handle tab navigation
 * Tabs are actually Components rendered Server side passed to the Client Component as props
 */
export default function TokenDetailsPage() {
  return (
    <PageWithTabs
      title={t`Token details`}
      tabs={[
        {
          key: "c3",
          label: t`C3`,
          optionsList: [getC3TokensOptions()],
          contents: {
            all: <TokenDetailsTab />,
            ubo: <>UBO</>,
            nbo: <>NBO</>,
          },
        },
        {
          key: "toucan",
          label: t`Toucan`,
          optionsList: [getToucanTokensOptions()],
          content: <TokenDetailsTab />,
        },
      ]}
    />
  );
}
