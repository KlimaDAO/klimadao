import { PaginatedResponse } from "lib/charts/types";
import {
  ConfigurationKey,
  getDesktopRenderer,
  getMobileRenderer,
} from "../configurations";
import { DataRenderer } from "../configurations/types";
import styles from "./styles.module.scss";

/** A Server component that renders a single page Data Table */
export default function Table<RI>(props: {
  configurationKey: ConfigurationKey;
  data: PaginatedResponse<RI>;
}) {
  const desktopRenderer = getDesktopRenderer(
    props.configurationKey
  ) as DataRenderer<RI>;
  const mobileRenderer = getMobileRenderer(
    props.configurationKey
  ) as DataRenderer<RI>;
  const data = props.data;
  return (
    <div className={styles.table}>
      <div className={styles.desktopOnly}>{desktopRenderer({ data })}</div>
      <div className={styles.mobileOnly}>{mobileRenderer({ data })}</div>
    </div>
  );
}
