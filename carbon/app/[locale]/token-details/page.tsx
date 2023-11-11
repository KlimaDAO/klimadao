import { t } from "@lingui/macro";
import PageWithTabs from "components/pages/PageWithTabs";
import TokenDetailsTab from "components/pages/TokenDetailsTab";
import { LocalizedPageProps } from "components/pages/props";
import {
  getC3PoolsOptions,
  getDateFilteringOptions,
  getPoolStatusOptions,
  getToucanPoolsOptions,
} from "lib/charts/options";
import { NodeDictionnary } from "lib/charts/types";
import { initLayout } from "../layout";

function title() {
  return t`Token details`;
}
function description() {
  return t`Token details`;
}

export async function generateMetadata() {
  return {
    title: title(),
    description: description(),
  };
}

/** Token details Page
 * Uses a Client Component (PageWithTabs) to handle tab and options navigation
 * Tabs are actually Components rendered Server side passed to the Client Component as props
 */
export default async function TokenDetailsPage(props: LocalizedPageProps) {
  await initLayout(props.params);

  const c3Contents: NodeDictionnary = {};
  const toucanContents: NodeDictionnary = {};
  const mossContents: NodeDictionnary = {};

  getDateFilteringOptions().forEach((date) => {
    getPoolStatusOptions().forEach((status) => {
      getToucanPoolsOptions().forEach((pool) => {
        toucanContents[`${pool.value}|${date.value}|${status.value}`] = (
          <TokenDetailsTab
            bridge="toucan"
            pool={pool.value}
            status={status.value}
            since={date.value}
          />
        );
      });
      getC3PoolsOptions().forEach((pool) => {
        c3Contents[`${pool.value}|${date.value}|${status.value}`] = (
          <TokenDetailsTab
            bridge="c3"
            pool={pool.value}
            status={status.value}
            since={date.value}
          />
        );
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
      title={title()}
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
