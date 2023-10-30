import OptionsSwitcher from "components/OptionsSwitcher";
import DetailPage, { DetailPageProps } from "components/pages/DetailPage";
import {
  getC3PoolsOptions,
  getDateFilteringOptions,
  getPoolStatusOptions,
  getToucanPoolsOptions,
} from "lib/charts/options";
import { Bridge } from "lib/charts/types";
import styles from "../PageWithTabs/styles.module.scss";

export default function TokenDetailsDetailPage(
  props: DetailPageProps & { bridge: Bridge }
) {
  const poolOptions =
    props.bridge == "toucan"
      ? getToucanPoolsOptions()
      : props.bridge == "c3"
      ? getC3PoolsOptions()
      : undefined;

  const newProps = { ...props };
  newProps.card = (
    <div className={styles.tabRoot}>
      <div className={styles.optionsSwitchers}>
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
