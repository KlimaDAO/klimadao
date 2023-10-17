import { PaginatedResponse } from "lib/charts/types";
import {
  ConfigurationKey,
  getDesktopRenderer,
  getMobileRenderer,
} from "../configurations";
import styles from "./styles.module.scss";

/** A Server component that renders a single page Data Table */
export default function Table<RI, P>(props: {
  configurationKey: ConfigurationKey;
  data: PaginatedResponse<RI>;
  params?: P;
}) {
  const desktopRenderer = getDesktopRenderer<RI, P>(props.configurationKey);
  const mobileRenderer = getMobileRenderer<RI, P>(props.configurationKey);
  const data = props.data;
  return (
    <div className={styles.table}>
      <div className={styles.desktopOnly}>
        {desktopRenderer({ data, params: props.params })}
      </div>
      <div className={styles.mobileOnly}>
        {mobileRenderer({ data, params: props.params })}
      </div>
    </div>
  );
}
