import { EMPTY_PAGINATED_RESPONSE } from "lib/charts/queries";
import { PaginatedResponse } from "lib/charts/types";
import { useEffect, useState } from "react";
import {
  ConfigurationKey,
  fetchData,
  getDesktopRenderer,
  getMobileRenderer,
} from "../configurations";
import { DataRenderer } from "../configurations/types";
import styles from "./styles.module.scss";

/** A Client Component (wannabe Server Component) that renders the actual Table
 * configurationKey: Table configuration key
 * page: the page of the dataset to render
 */
export default function Table<RI>(props: {
  configurationKey: ConfigurationKey;
  page: number;
}) {
  const [data, setData] = useState<PaginatedResponse<RI>>(
    EMPTY_PAGINATED_RESPONSE
  );
  useEffect(() => {
    fetchData(props.configurationKey, props.page).then((data) => {
      /* FIXME: Unfortunately we have to hardcast this */
      setData(data as PaginatedResponse<RI>);
    });
  }, [props.page]);
  const desktopRenderer = getDesktopRenderer(
    props.configurationKey
  ) as DataRenderer<RI>;
  const mobileRenderer = getMobileRenderer(
    props.configurationKey
  ) as DataRenderer<RI>;

  return (
    <>
      <div className={styles.desktopOnly}>{desktopRenderer({ data })}</div>
      <div className={styles.mobileOnly}>{mobileRenderer({ data })}</div>
    </>
  );
}
