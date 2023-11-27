import OptionsSwitcher from "components/OptionsSwitcher";
import DetailPage, { DetailPageProps } from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";
import {
  getC3PoolsOptions,
  getDateFilteringOptions,
  getPoolStatusOptions,
  getToucanPoolsOptions,
} from "lib/charts/options";
import styles from "../PageWithTabs/styles.module.scss";
import { TokenDetailPageProps } from "../props";

export default function TokenDetailsDetailPage(
  props: Omit<DetailPageProps, "backButtonHref"> & TokenDetailPageProps
) {
  const poolOptions =
    props.params.bridge == "toucan"
      ? getToucanPoolsOptions()
      : props.params.bridge == "c3"
      ? getC3PoolsOptions()
      : undefined;

  const status =
    props.searchParams.status == "deposited" ||
    props.searchParams.status == "bridged"
      ? "bridged"
      : "retired";

  const backButtonQuery: Record<string, string> = {};
  backButtonQuery.tab = props.params.bridge;
  backButtonQuery[`option_${props.params.bridge}_0`] = props.searchParams.pool;
  backButtonQuery[`option_${props.params.bridge}_1`] = props.searchParams.since;
  backButtonQuery[`option_${props.params.bridge}_2`] = status;

  const newProps: DetailPageProps = {
    ...props,
    ...{
      backButtonHref: `${PageLinks.TokenDetails}?${new URLSearchParams(
        backButtonQuery
      ).toString()}`,
    },
  };
  newProps.card = (
    <div className={styles.tabRoot}>
      <div
        className={`${styles.optionsSwitchers} ${styles.optionsSwitchersWithoutTabs}`}
      >
        {poolOptions && (
          <div className={styles.optionsSwitcherWrapper}>
            <OptionsSwitcher
              name={`pool`}
              options={poolOptions}
              className={styles.optionsSwitcher}
              readonly={true}
            />
          </div>
        )}
        <div className={styles.optionsSwitcherWrapper}>
          <OptionsSwitcher
            name={`since`}
            options={getDateFilteringOptions()}
            className={styles.optionsSwitcher}
            readonly={true}
          />
        </div>
        <div className={styles.optionsSwitcherWrapper}>
          <OptionsSwitcher
            name={`status`}
            options={getPoolStatusOptions()}
            className={styles.optionsSwitcher}
            readonly={true}
          />
        </div>
      </div>
      {props.card}
    </div>
  );
  return <DetailPage {...newProps} />;
}

export function backButtonHref() {}
