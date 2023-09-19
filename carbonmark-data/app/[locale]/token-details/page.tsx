import { t } from "@lingui/macro";
import PageWithTabs from "components/pages/PageWithTabs";
import TokenDetailsTab from "components/pages/TokenDetailsTab";
import {
  getC3PoolsOptions,
  getDateFilteringOptions,
  getPoolStatusOptions,
  getToucanPoolsOptions,
} from "lib/charts/options";
import { NodeDictionnary } from "lib/charts/types";
/** Retirement Trends Page
 * Uses a Client Component (RetirementTrendsPage) to handle tab navigation
 * Tabs are actually Components rendered Server side passed to the Client Component as props
 */
export default function TokenDetailsPage() {
  const c3Contents: NodeDictionnary = {};
  const toucanContents: NodeDictionnary = {};
  getDateFilteringOptions().forEach((date) =>
    getPoolStatusOptions().forEach((status) => {
      // There is no data for retired tokens in
      toucanContents[`all|${date.value}|${status.value}`] = (
        <TokenDetailsTab
          bridge="toucan"
          pool="all"
          status={status.value}
          since={date.value}
        />
      );
    })
  );
  getToucanPoolsOptions().forEach((pool) => {
    toucanContents[`${pool.value}|lifetime|bridged`] = (
      <TokenDetailsTab
        bridge="toucan"
        pool={pool.value}
        status="bridged"
        since="lifetime"
      />
    );
  });

  return (
    <PageWithTabs
      title={t`Token details`}
      tabs={[
        {
          key: "c3",
          label: t`C3`,
          optionsList: [
            getC3PoolsOptions(),
            getDateFilteringOptions(),
            getPoolStatusOptions(),
          ],
          contents: c3Contents,
        },
        {
          key: "toucan",
          label: t`Toucan`,
          optionsList: [
            getToucanPoolsOptions(),
            getDateFilteringOptions(),
            getPoolStatusOptions(),
          ],
          contents: toucanContents,
        },
      ]}
    />
  );
}