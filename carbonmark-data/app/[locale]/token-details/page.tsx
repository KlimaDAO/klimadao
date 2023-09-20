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
  const mossContents: NodeDictionnary = {};
  getDateFilteringOptions().forEach((date) => {
    getPoolStatusOptions().forEach((status) => {
      getToucanPoolsOptions().forEach((pool) => {
        if (pool.value == "all" || status.value == "bridged") {
          toucanContents[`${pool.value}|${date.value}|${status.value}`] = (
            <TokenDetailsTab
              bridge="toucan"
              pool={pool.value}
              status={status.value}
              since={date.value}
            />
          );
          c3Contents[`${pool.value}|${date.value}|${status.value}`] = (
            <TokenDetailsTab
              bridge="c3"
              pool={pool.value}
              status={status.value}
              since={date.value}
            />
          );
        }
      });
    });
    mossContents[`${date.value}`] = (
      <TokenDetailsTab
        bridge="moss"
        pool="all"
        status="bridged"
        since={date.value}
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
          key: "moss",
          label: t`Moss`,
          optionsList: [getDateFilteringOptions()],
          contents: mossContents,
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
